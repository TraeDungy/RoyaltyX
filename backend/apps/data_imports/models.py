from django.db import models

from apps.project.models import Project
from common.models import BaseModel


class File(BaseModel):
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, null=True, blank=True
    )
    file = models.FileField(upload_to="uploads/", max_length=255, null=True)
    name = models.CharField(max_length=255, blank=True)

    def save(self, *args, **kwargs):
        if not self.name and self.file:
            self.name = self.file.name
        super().save(*args, **kwargs)

    class Meta:
        db_table = "file"


class Dataset(BaseModel):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("processing", "Processing"),
        ("completed", "Completed"),
        ("error", "Error"),
    ]

    file = models.ForeignKey(File, on_delete=models.CASCADE, related_name="datasets")
    month = models.IntegerField()
    year = models.IntegerField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    error_message = models.TextField(blank=True, null=True)
    column_mapping = models.JSONField(default=dict, blank=True)

    class Meta:
        db_table = "dataset"
