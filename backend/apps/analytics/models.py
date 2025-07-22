from django.db import models

from apps.product.models import Product
from apps.project.models import Project
from common.models import BaseModel


class AnalyticsForecast(BaseModel):
    """Forecast text generated from historical analytics."""

    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    product = models.ForeignKey(
        Product, null=True, blank=True, on_delete=models.CASCADE
    )
    period_start = models.DateField(null=True, blank=True)
    period_end = models.DateField(null=True, blank=True)
    forecast = models.TextField()

    class Meta:
        db_table = "analytics_forecast"
        ordering = ["-created_at"]

    def __str__(self) -> str:  # pragma: no cover - simple representation
        return f"Forecast {self.id} for project {self.project_id}"

