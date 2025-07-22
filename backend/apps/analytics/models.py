from django.db import models

from apps.project.models import Project
from common.models import BaseModel


class AnalyticsForecast(BaseModel):
    """Forecasted analytics data for a project."""

    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    forecast = models.TextField()

    class Meta:
        db_table = "analytics_forecast"

