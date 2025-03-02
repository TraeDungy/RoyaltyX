from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import File
from .serializers import FileSerializer
from .utils.report_processing import process_report


class FileListCreateView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        files = File.objects.all()
        serializer = FileSerializer(files, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        uploaded_file = request.FILES.get("file")
        project_id = getattr(user, "currently_selected_project_id", None)

        response = process_report(uploaded_file, project_id)

        data = request.data.copy()
        data["project"] = project_id

        serializer = FileSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(response)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FileDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        file = get_object_or_404(File, pk=pk)
        serializer = FileSerializer(file)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        file = get_object_or_404(File, pk=pk)
        file.delete()
        return Response(
            {"message": "File deleted successfully"}, status=status.HTTP_204_NO_CONTENT
        )




class ProducerListCreateView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        user = request.user
        uploaded_file = request.FILES.get("file")
        project_id = getattr(user, "currently_selected_project_id", None)

        response = process_report(uploaded_file, project_id)

        data = request.data.copy()
        data["project"] = project_id

        serializer = FileSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(response)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)