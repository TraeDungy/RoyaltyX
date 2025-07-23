from django.db import models

from apps.project.models import Project
from common.models import BaseModel


class FeeType(BaseModel):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    class Meta:
        db_table = "fee_type"


class FeeGroup(BaseModel):
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="fee_groups"
    )
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    class Meta:
        db_table = "fee_group"


class FeeRule(BaseModel):
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="fee_rules"
    )
    fee_type = models.ForeignKey(
        FeeType, on_delete=models.CASCADE, related_name="rules"
    )
    group = models.ForeignKey(
        "FeeGroup",
        on_delete=models.CASCADE,
        related_name="rules",
        null=True,
        blank=True,
    )
    name = models.CharField(max_length=100, blank=True, null=True)
    rate = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    fixed_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    is_percent = models.BooleanField(default=True)
    display_on_reports = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "fee_rule"


class FeeAdjustment(BaseModel):
    rule = models.ForeignKey(
        FeeRule, on_delete=models.CASCADE, related_name="adjustments"
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    note = models.CharField(max_length=255, blank=True, null=True)
    applied_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "fee_adjustment"
