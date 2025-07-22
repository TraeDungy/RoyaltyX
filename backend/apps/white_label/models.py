from django.db import models
from apps.project.models import Project


class WhiteLabelConfig(models.Model):
    project = models.OneToOneField(
        Project, on_delete=models.CASCADE, related_name="white_label_config"
    )
    brand_name = models.CharField(max_length=255, blank=True)
    domain = models.CharField(max_length=255, blank=True)
    logo_url = models.URLField(blank=True)
    primary_color = models.CharField(max_length=50, blank=True)
    secondary_color = models.CharField(max_length=50, blank=True)

    class Meta:
        db_table = "white_label_config"
