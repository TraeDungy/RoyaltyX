import logging

from django.utils import timezone

from apps.emails.services import Email
from apps.notifications.utils import create_notification

from .models import Milestone

logger = logging.getLogger(__name__)


def send_text_message(phone, message):
    logger.info("SMS to %s: %s", phone, message)


def check_milestones(user, analytics_data):
    project_id = user.currently_selected_project_id
    milestones = Milestone.objects.filter(user=user, project_id=project_id, is_achieved=False)

    metric_map = {
        "impressions": "total_impressions",
        "sales": "total_sales_count",
        "rentals": "rentals_count",
        "views": "total_impressions",
        "downloads": "purchases_count",
        "royalty_revenue": "total_royalty_revenue",
        "impression_revenue": "total_impression_revenue",
    }

    achieved = []

    for milestone in milestones:
        key = metric_map.get(milestone.metric)
        if not key:
            continue
        value = analytics_data.get(key, 0)
        if value >= float(milestone.threshold):
            milestone.is_achieved = True
            milestone.achieved_at = timezone.now()
            milestone.save(update_fields=["is_achieved", "achieved_at", "updated_at"])

            title = f"Milestone reached: {milestone.metric} {milestone.threshold}"
            create_notification(user, title)

            if milestone.notify_email:
                try:
                    Email.send(
                        subject=title,
                        message=title,
                        recipient_list=[user.email],
                        fail_silently=True,
                    )
                except Exception:
                    logger.exception("Failed to send milestone email")

            if milestone.notify_text and getattr(user, "phone_number", None):
                send_text_message(user.phone_number, title)

            achieved.append(milestone.id)

    return achieved
