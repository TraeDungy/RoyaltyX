from django.db import models

from apps.project.models import Project
from common.models import BaseModel


class Report(BaseModel):

    filename = models.CharField(max_length=50)
    file = models.FileField(upload_to="reports/", null=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    created_by = models.ForeignKey("user.User", on_delete=models.CASCADE)
    period_start = models.DateField()
    period_end = models.DateField()

    class Meta:
        db_table = "report"
