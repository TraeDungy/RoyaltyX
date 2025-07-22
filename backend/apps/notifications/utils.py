import os
from django.contrib.auth import get_user_model

from twilio.rest import Client

from apps.emails.services import Email

from .models import Notification, NotificationPreference

User = get_user_model()


TWILIO_ACCOUNT_SID = os.environ.get("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.environ.get("TWILIO_AUTH_TOKEN")
TWILIO_FROM_NUMBER = os.environ.get("TWILIO_FROM_NUMBER")


def send_sms(to_number: str, body: str) -> bool:
    """Send an SMS message using Twilio."""
    if not (TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN and TWILIO_FROM_NUMBER):
        return False
    try:
        client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        client.messages.create(body=body, from_=TWILIO_FROM_NUMBER, to=to_number)
        return True
    except Exception:
        return False


def create_notification(user, title, message=""):
    """Create a notification and dispatch based on user preferences."""
    if not isinstance(user, User):
        raise ValueError("Invalid user provided")

    notification = Notification.objects.create(user=user, title=title)

    pref, _ = NotificationPreference.objects.get_or_create(user=user)
    if pref.email_notifications:
        Email.send(subject=title, message=message or title, recipient_list=[user.email])
    if pref.sms_notifications and pref.phone_number:
        send_sms(pref.phone_number, message or title)

    # in_app_notifications is handled by creating the notification object
    return notification
