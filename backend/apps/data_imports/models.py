from django.db import models

from apps.project.models import Project
from common.models import BaseModel


class ImportTemplate(BaseModel):
    """Reusable column mapping template detected from uploaded files."""

    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    header_signature = models.CharField(max_length=64)
    column_mapping = models.JSONField(default=dict, blank=True)

    class Meta:
        db_table = "import_template"
        unique_together = ("project", "header_signature")

    def __str__(self) -> str:  # pragma: no cover - simple representation
        return f"Template {self.name} ({self.project_id})"


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
    template = models.ForeignKey(
        ImportTemplate,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    month = models.IntegerField()
    year = models.IntegerField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    error_message = models.TextField(blank=True, null=True)
    column_mapping = models.JSONField(default=dict, blank=True)

    class Meta:
        db_table = "dataset"
