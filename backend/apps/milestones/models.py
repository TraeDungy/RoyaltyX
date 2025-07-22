from django.contrib.auth import get_user_model
from django.db import models

from common.models import BaseModel

User = get_user_model()


class PerformanceMilestone(BaseModel):
    METRIC_IMPRESSIONS = "impressions"
    METRIC_SALES = "sales"
    METRIC_RENTALS = "rentals"
    METRIC_VIEWS = "views"
    METRIC_DOWNLOADS = "downloads"

    METRIC_CHOICES = [
        (METRIC_IMPRESSIONS, "Impressions"),
        (METRIC_SALES, "Sales"),
        (METRIC_RENTALS, "Rentals"),
        (METRIC_VIEWS, "Views"),
        (METRIC_DOWNLOADS, "Downloads"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="milestones")
    metric = models.CharField(max_length=20, choices=METRIC_CHOICES)
    threshold = models.PositiveIntegerField()
    alert_via_email = models.BooleanField(default=True)
    alert_via_sms = models.BooleanField(default=False)
    achieved_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = "performance_milestone"

    def __str__(self):
        return f"{self.user.email} - {self.metric} >= {self.threshold}" + (
            " (achieved)" if self.achieved_at else ""
        )
