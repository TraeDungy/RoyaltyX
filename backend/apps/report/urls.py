from django.urls import path

from .views.report import ReportsView
from .views.report_template import (
    ReportTemplateActivateAPIView,
    ReportTemplateDetailAPIView,
    ReportTemplateDuplicateAPIView,
    ReportTemplateUploadAPIView,
    ReportTemplateView,
)

urlpatterns = [
    path("", ReportsView.as_view(), name="reports-view"),
    path("templates/", ReportTemplateView.as_view(), name="report-template-view"),
    path(
        "templates/upload/",
        ReportTemplateUploadAPIView.as_view(),
        name="report-template-upload",
    ),
    path(
        "template/<int:pk>/",
        ReportTemplateDetailAPIView.as_view(),
        name="report-detail-view",
    ),
    path(
        "template/<int:pk>/duplicate/",
        ReportTemplateDuplicateAPIView.as_view(),
        name="report-template-duplicate",
    ),
    path(
        "template/<int:pk>/activate/",
        ReportTemplateActivateAPIView.as_view(),
        name="report-template-activate",
    ),
]
