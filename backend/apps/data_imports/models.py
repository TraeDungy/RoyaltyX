from django.db import models

from apps.project.models import Project
from common.models import BaseModel


class File(BaseModel):
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, null=True, blank=True
    )
    file = models.FileField(upload_to="uploads/", null=True)
    name = models.CharField(max_length=255, blank=True)

    def save(self, *args, **kwargs):
        if not self.name and self.file:
            self.name = self.file.name
        super().save(*args, **kwargs)

    class Meta:
        db_table = "file"
