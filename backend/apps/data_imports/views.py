from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import File
from .serializers import FileSerializer
from .services import delete_file
from .utils.producer_processing import process_producers
from .utils.report_processing import process_report


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

        data = request.data.copy()
        data["project"] = project_id

        serializer = FileSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        saved_file = serializer.save()

        report_response = process_report(uploaded_file, project_id, saved_file.id)

        return Response(
            {
                "report": report_response,
                "file": FileSerializer(saved_file).data,
            },
            status=status.HTTP_201_CREATED,
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
