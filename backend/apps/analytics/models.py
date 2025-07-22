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


class AnalyticsRecord(BaseModel):
    """Stores aggregated analytics metrics for a period."""

    GRANULARITY_CHOICES = [
        ("hourly", "Hourly"),
        ("daily", "Daily"),
        ("monthly", "Monthly"),
        ("yearly", "Yearly"),
    ]

    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    period_start = models.DateField()
    period_end = models.DateField()
    impressions = models.PositiveBigIntegerField(default=0)
    impression_revenue = models.DecimalField(
        max_digits=30,
        decimal_places=18,
        default=0,
    )
    sales = models.PositiveBigIntegerField(default=0)
    rentals = models.PositiveBigIntegerField(default=0)
    royalty_revenue = models.DecimalField(
        max_digits=30,
        decimal_places=2,
        default=0,
    )
    granularity = models.CharField(
        max_length=10,
        choices=GRANULARITY_CHOICES,
        default="daily",
    )

    class Meta:
        db_table = "analytics_record"
        unique_together = (
            "project",
            "product",
            "period_start",
            "period_end",
            "granularity",
        )

    def __str__(self) -> str:
        product = f"{self.product_id}" if self.product_id else "project"
        return f"{product}:{self.period_start}-{self.period_end}"
