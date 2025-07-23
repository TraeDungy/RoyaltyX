from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Dataset, File, ImportTemplate
from .serializers import DatasetSerializer, FileSerializer
from .services import create_file, delete_file
from .utils.producer_processing import process_producers
from .utils.report_processing import (
    process_report,
    detect_headers,
    header_signature,
)


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
        file = request.FILES.get("file")
        project_id = getattr(user, "currently_selected_project_id", None)

        data = request.data.copy()
        data["project"] = project_id

        try:
            response_data = create_file(file, data)
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


class DatasetDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        dataset = get_object_or_404(Dataset, pk=pk)
        serializer = DatasetSerializer(dataset)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        dataset = get_object_or_404(Dataset, pk=pk)
        mapping = request.data.get("column_mapping")
        if not isinstance(mapping, dict):
            return Response(
                {"error": "column_mapping must be an object"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        dataset.column_mapping = mapping
        dataset.status = "processing"
        dataset.error_message = ""
        dataset.save()

        file_obj = dataset.file.file
        file_obj.open("rb")
        try:
            headers = detect_headers(file_obj)
            signature = header_signature(headers)
            template, _ = ImportTemplate.objects.get_or_create(
                project_id=dataset.file.project_id,
                header_signature=signature,
                defaults={"name": dataset.file.name},
            )
            template.column_mapping = mapping
            template.save()
            dataset.template = template
            result = process_report(
                file_obj, dataset.file.project_id, dataset.file.id, mapping
            )
        finally:
            file_obj.close()

        if result["status"] == "success":
            dataset.status = "completed"
        else:
            dataset.status = "error"
            dataset.error_message = result["message"]
        dataset.save()

        return Response(DatasetSerializer(dataset).data, status=status.HTTP_200_OK)
