import uuid

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.report.models import Report
from apps.report.serializers import ReportRequestSerializer, ReportSerializer
from apps.report.tasks import generate_report_pdf


class ReportsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        currently_selected_project_id = user.currently_selected_project_id
        reports = Report.objects.filter(
            project_id=currently_selected_project_id, created_by=request.user
        ).order_by("-created_at")
        serializer = ReportSerializer(reports, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        currently_selected_project_id = request.user.currently_selected_project_id
        serializer = ReportRequestSerializer(
            data=request.query_params,
            context={"project_id": currently_selected_project_id},
        )
        serializer.is_valid(raise_exception=True)
        period_start = serializer.validated_data.get("period_start", None)
        period_end = serializer.validated_data.get("period_end", None)
        template = serializer.validated_data.get("template", None)

        filename = f"rx_report_{uuid.uuid4().hex}.pdf"

        report = Report.objects.create(
            template=template,
            filename=filename,
            project_id=currently_selected_project_id,
            created_by=request.user,
            period_start=period_start,
            period_end=period_end,
        )

        base_url = request.build_absolute_uri("/")
        generate_report_pdf.delay(report.id, base_url)

        serializer = ReportSerializer(report)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
