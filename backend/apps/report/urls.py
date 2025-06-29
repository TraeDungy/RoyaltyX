from django.urls import path

from .views.report import ReportsView
from .views.report_template import ReportTemplateDetailAPIView, ReportTemplateView

urlpatterns = [
    path("", ReportsView.as_view(), name="reports-view"),
    path("templates/", ReportTemplateView.as_view(), name="report-template-view"),
    path(
        "template/<int:pk>/",
        ReportTemplateDetailAPIView.as_view(),
        name="report-detail-view",
    ),
]
