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


class NotificationPreference(BaseModel):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="notification_preference"
    )
    email_notifications = models.BooleanField(default=True)
    sms_notifications = models.BooleanField(default=False)
    in_app_notifications = models.BooleanField(default=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
        return f"Preferences for {self.user.username}"

    class Meta:
        db_table = "notification_preference"
