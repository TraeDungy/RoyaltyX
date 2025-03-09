import uuid
from datetime import datetime

from django.core.files.base import ContentFile
from django.template.loader import render_to_string
from django.utils.timezone import now
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from weasyprint import HTML

from apps.product.models import Product
from apps.project.models import Project
from apps.project.utils import calculateProjectAnalytics

from .models import Report
from .serializers import ReportSerializer


class ReportsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        currently_selected_project_id = user.currently_selected_project_id
        reports = Report.objects.filter(project_id=currently_selected_project_id)
        serializer = ReportSerializer(reports, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        period_start = request.query_params.get("period_start")
        period_end = request.query_params.get("period_end")

        filters = {}

        if period_start and period_end:
            try:
                start_date = datetime.strptime(period_start, "%Y-%m-%d")
                end_date = datetime.strptime(period_end, "%Y-%m-%d")
                filters["created_at__range"] = (start_date, end_date)
            except ValueError:
                return Response(
                    {"error": "Invalid date format. Use YYYY-MM-DD."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        analytics = calculateProjectAnalytics(
            request.user.currently_selected_project_id, filters
        )

        user = request.user
        currently_selected_project_id = user.currently_selected_project_id
        project = Project.objects.get(id=currently_selected_project_id)
        products = Product.objects.filter(project=project)

        filename = f"report_{uuid.uuid4().hex}.pdf"

        context = {
            "project": project,
            "products": products,
            "user": user, 
            "analytics": analytics,
            "period_start": period_start,
            "period_end": period_end,
            "created_at": now(),
        }

        html_content = render_to_string("report_template.html", context)

        pdf_file = HTML(string=html_content).write_pdf()

        report = Report.objects.create(
            filename=filename, 
            project_id=currently_selected_project_id, 
            created_by=user,
            period_start=period_start,
            period_end=period_end
        )
        report.file.save(filename, ContentFile(pdf_file))

        serializer = ReportSerializer(report)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
