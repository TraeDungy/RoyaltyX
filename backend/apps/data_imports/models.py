from django.db import models
from common.models import BaseModel
from apps.project.models import Project

class File(BaseModel):
    name = models.CharField(max_length=255, blank=False, null=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, null=False, blank=False)
