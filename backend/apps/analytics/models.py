from django.db import models

from apps.project.models import Project
from apps.product.models import Product
from common.models import BaseModel


class AnalyticsRecord(BaseModel):
    """Aggregated analytics metrics for a project or product within a date range."""

    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    period_start = models.DateField()
    period_end = models.DateField()
    impressions = models.IntegerField(default=0)
    impression_revenue = models.DecimalField(max_digits=30, decimal_places=18, default=0)
    sales_count = models.IntegerField(default=0)
    rentals_count = models.IntegerField(default=0)
    royalty_revenue = models.DecimalField(max_digits=40, decimal_places=2, default=0)

    class Meta:
        db_table = "analytics_record"
        unique_together = ("project", "product", "period_start", "period_end")

    def __str__(self) -> str:  # pragma: no cover - simple string representation
        target = f"Product {self.product_id}" if self.product_id else f"Project {self.project_id}"
        return f"AnalyticsRecord({target} {self.period_start} -> {self.period_end})"
