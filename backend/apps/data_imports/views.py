import os

from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import File
from .serializers import FileSerializer
from .services import create_file, delete_file
from .utils.producer_processing import process_producers


class FileListCreateView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        files = File.objects.filter(
            project_id=request.user.currently_selected_project_id
        ).order_by("-created_at")

        serializer = FileSerializer(files, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        uploaded_file = request.FILES.get("file")
        project_id = getattr(user, "currently_selected_project_id", None)

        if not uploaded_file:
            return Response(
                {"error": "No file provided"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        ext = os.path.splitext(uploaded_file.name)[1].lower()
        if ext not in [".csv", ".xlsx"]:
            return Response(
                {"error": "Unsupported file format"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        data = request.data.copy()
        data["project"] = project_id

        try:
            response_data = create_file(uploaded_file, data)
            return Response(response_data, status=status.HTTP_201_CREATED)

        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response(
                {"error": "An unexpected error occurred: " + str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class FileDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        file = get_object_or_404(File, pk=pk)
        serializer = FileSerializer(file)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        response_data = delete_file(pk)
        return Response(response_data, status=status.HTTP_204_NO_CONTENT)


class ProducerListCreateView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        user = request.user
        uploaded_file = request.FILES.get("file")
        project_id = getattr(user, "currently_selected_project_id", None)

        response = process_producers(uploaded_file, project_id)

        return Response(response)
