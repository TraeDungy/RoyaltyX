from django.contrib.auth import get_user_model
from django.db import models

from apps.project.models import Project
from common.models import BaseModel

User = get_user_model()


class Milestone(BaseModel):
    METRIC_CHOICES = [
        ("impressions", "Impressions"),
        ("sales", "Sales"),
        ("rentals", "Rentals"),
        ("views", "Views"),
        ("downloads", "Downloads"),
        ("royalty_revenue", "Royalty Revenue"),
        ("impression_revenue", "Impression Revenue"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="milestones")
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    metric = models.CharField(max_length=50, choices=METRIC_CHOICES)
    threshold = models.DecimalField(max_digits=20, decimal_places=2)
    is_achieved = models.BooleanField(default=False)
    achieved_at = models.DateTimeField(null=True, blank=True)
    notify_email = models.BooleanField(default=True)
    notify_text = models.BooleanField(default=False)

    class Meta:
        db_table = "milestone"

    def __str__(self):
        return f"{self.metric}: {self.threshold}"
