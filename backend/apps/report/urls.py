from django.urls import path

from .views.report_template import ReportTemplateView, ReportTemplateDetailAPIView

from .views.report import ReportsView

urlpatterns = [
    path("", ReportsView.as_view(), name="reports-view"),
    path("templates/", ReportTemplateView.as_view()),
    path('template/<int:pk>/', ReportTemplateDetailAPIView.as_view()),
]
