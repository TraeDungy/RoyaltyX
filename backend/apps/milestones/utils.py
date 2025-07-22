from datetime import datetime
from typing import Dict

from django.utils import timezone

from apps.notifications.utils import create_notification
from apps.emails.services import Email

from .models import PerformanceMilestone


def _send_sms(phone_number: str, message: str) -> None:
    """Placeholder SMS sender."""
    print(f"Sending SMS to {phone_number}: {message}", flush=True)


def check_milestones(user, metrics: Dict[str, int]) -> None:
    """Check milestones for a user and notify if reached."""
    milestones = PerformanceMilestone.objects.filter(user=user, achieved_at__isnull=True)
    for milestone in milestones:
        metric_value = metrics.get(milestone.metric)
        if metric_value is None:
            continue
        if metric_value >= milestone.threshold:
            milestone.achieved_at = timezone.now()
            milestone.save()
            create_notification(user, f"Milestone reached: {milestone.metric} {milestone.threshold}")
            if milestone.alert_via_email:
                Email.send(
                    subject="Milestone achieved!",
                    message=f"Congrats! You reached {milestone.threshold} {milestone.metric}.",
                    recipient_list=[user.email],
                )
            if milestone.alert_via_sms and hasattr(user, "phone_number") and user.phone_number:
                _send_sms(user.phone_number, f"Milestone reached: {milestone.metric} {milestone.threshold}")
