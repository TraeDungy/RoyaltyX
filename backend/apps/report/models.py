import logging

from django.db import models

from apps.project.models import Project
from common.models import BaseModel

logger = logging.getLogger(__name__)


class ReportTemplates(BaseModel):
    template_name = models.CharField(max_length=255)
    title = models.CharField(max_length=100, blank=True, null=True)
    logo = models.ImageField(upload_to="report-templates/", blank=True, null=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    created_by = models.ForeignKey("user.User", on_delete=models.CASCADE)
    address = models.CharField(max_length=500, blank=True, null=True)
    include_sales_revenue = models.BooleanField(default=True)
    include_impressions = models.BooleanField(default=True)
    include_impressions_revenue = models.BooleanField(default=True)
    colors = models.JSONField(default=dict, blank=True, null=True)
    typography = models.JSONField(default=dict, blank=True, null=True)
    layout = models.JSONField(default=dict, blank=True, null=True)
    logo_settings = models.JSONField(default=dict, blank=True, null=True)
    is_active = models.BooleanField(default=False)

    class Meta:
        db_table = "report_templates"

    def logo_absolute_url(self, request):
        if self.logo:
            logger.info("Serving logo: %s", self.logo)
            logger.info(
                "Logo absolute URL: %s", request.build_absolute_uri(self.logo.url)
            )
            return request.build_absolute_uri(self.logo.url)
        return None


class Report(BaseModel):
    filename = models.CharField(max_length=50)
    file = models.FileField(upload_to="reports/", null=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    template = models.ForeignKey(ReportTemplates, on_delete=models.CASCADE)
    created_by = models.ForeignKey("user.User", on_delete=models.CASCADE)
    period_start = models.DateField(null=True)
    period_end = models.DateField(null=True)

    class Meta:
        db_table = "report"


class ReportSchedule(BaseModel):
    """Schedule periodic generation and emailing of a report."""

    INTERVAL_WEEKLY = "weekly"
    INTERVAL_MONTHLY = "monthly"
    INTERVAL_QUARTERLY = "quarterly"
    INTERVAL_YEARLY = "yearly"

    INTERVAL_CHOICES = [
        (INTERVAL_WEEKLY, "Weekly"),
        (INTERVAL_MONTHLY, "Monthly"),
        (INTERVAL_QUARTERLY, "Quarterly"),
        (INTERVAL_YEARLY, "Yearly"),
    ]

    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    template = models.ForeignKey(ReportTemplates, on_delete=models.CASCADE)
    created_by = models.ForeignKey("user.User", on_delete=models.CASCADE)
    recipients = models.JSONField(default=list)
    interval = models.CharField(max_length=10, choices=INTERVAL_CHOICES)
    next_run = models.DateField()
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "report_schedule"

    def __str__(self):  # pragma: no cover - simple representation
        return f"Schedule {self.id} for {self.project.name}"
