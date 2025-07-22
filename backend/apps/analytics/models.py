from django.db import models

from common.models import BaseModel
from apps.project.models import Project
from apps.product.models import Product


class AnalyticsRecord(BaseModel):
    """Stores aggregated analytics results for a project or a specific product."""

    GRANULARITY_HOURLY = "hourly"
    GRANULARITY_DAILY = "daily"
    GRANULARITY_MONTHLY = "monthly"
    GRANULARITY_YEARLY = "yearly"

    GRANULARITY_CHOICES = [
        (GRANULARITY_HOURLY, "Hourly"),
        (GRANULARITY_DAILY, "Daily"),
        (GRANULARITY_MONTHLY, "Monthly"),
        (GRANULARITY_YEARLY, "Yearly"),
    ]

    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    period_start = models.DateField()
    period_end = models.DateField()
    granularity = models.CharField(max_length=10, choices=GRANULARITY_CHOICES)
    data = models.JSONField()

    class Meta:
        db_table = "analytics_record"
        indexes = [
            models.Index(fields=["project", "product", "period_start", "period_end", "granularity"])
        ]


