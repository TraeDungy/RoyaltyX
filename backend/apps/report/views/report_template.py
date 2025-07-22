from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.report.models import Report, ReportTemplates
from apps.report.serializers import (
    ReportTemplateCreateSerializer,
    ReportTemplateSerializer,
    ReportTemplateUpdateSerializer,
)


class ReportTemplateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        currently_selected_project_id = user.currently_selected_project_id
        templates = ReportTemplates.objects.filter(
            project_id=currently_selected_project_id
        ).order_by("-created_at")
        serializer = ReportTemplateSerializer(templates, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ReportTemplateCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(
                created_by=request.user, project=request.user.currently_selected_project
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReportTemplateDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        return get_object_or_404(ReportTemplates, pk=pk, is_deleted=False)

    def get(self, request, pk):
        template = self.get_object(pk)
        serializer = ReportTemplateSerializer(template)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        template = self.get_object(pk)
        serializer = ReportTemplateUpdateSerializer(template, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        template = self.get_object(pk)
        if Report.objects.filter(template=template).exists():
            template.is_deleted = True
            template.save()
        else:
            template.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ReportTemplateDuplicateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        template = get_object_or_404(ReportTemplates, pk=pk, is_deleted=False)
        template.pk = None
        template.template_name = f"{template.template_name} Copy"
        template.is_active = False
        template.save()
        serializer = ReportTemplateSerializer(template)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ReportTemplateActivateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        user = request.user
        project_id = user.currently_selected_project_id
        template = get_object_or_404(
            ReportTemplates,
            pk=pk,
            project_id=project_id,
            is_deleted=False,
        )
        ReportTemplates.objects.filter(project_id=project_id).update(is_active=False)
        template.is_active = True
        template.save()
        serializer = ReportTemplateSerializer(template)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ReportTemplateUploadAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ReportTemplateCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(
                created_by=request.user, project=request.user.currently_selected_project
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
