from django.contrib.auth import get_user_model
from django.db import models

from common.models import BaseModel

User = get_user_model()


class DashboardTemplate(BaseModel):
    """Dashboard layout template for a user"""

    name = models.CharField(max_length=255)
    layout_json = models.JSONField(default=dict)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="dashboard_templates"
    )

    class Meta:
        db_table = "dashboard_template"

    def __str__(self):
        return self.name
