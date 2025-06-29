from django.db import models

from apps.project.models import Project
from common.models import BaseModel


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

    class Meta:
        db_table = "report_templates"

    def logo_absolute_url(self, request):
        if self.logo:
            print(self.logo)
            print(request.build_absolute_uri(self.logo.url))
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
