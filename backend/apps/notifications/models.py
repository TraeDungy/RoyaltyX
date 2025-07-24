from django.contrib.auth import get_user_model
from django.db import models

from common.models import BaseModel

User = get_user_model()


class Notification(BaseModel):
    title = models.CharField(max_length=255)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="notifications"
    )
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    class Meta:
        db_table = "notification"


class Banner(BaseModel):
    """Announcement banner shown on dashboards."""

    title = models.CharField(max_length=255)
    message = models.TextField(blank=True)
    image_url = models.URLField(blank=True)
    video_url = models.URLField(blank=True)
    links = models.JSONField(default=list, blank=True)
    is_active = models.BooleanField(default=False)

    class Meta:
        db_table = "banner"

    def __str__(self):  # pragma: no cover - simple representation
        return self.title
