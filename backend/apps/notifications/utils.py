from django.contrib.auth import get_user_model

from .models import Notification

User = get_user_model()


def create_notification(user, title):
    """
    Utility function to create a notification for a specific user.
    """
    if not isinstance(user, User):
        raise ValueError("Invalid user provided")

    return Notification.objects.create(user=user, title=title)
