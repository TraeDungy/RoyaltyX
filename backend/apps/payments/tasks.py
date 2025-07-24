from celery import shared_task
from django.contrib.auth import get_user_model
from django.utils import timezone

from apps.emails.services import Email

User = get_user_model()

@shared_task
def downgrade_past_due_users():
    """Downgrade users whose grace period has expired."""
    now = timezone.now()
    users = User.objects.filter(
        subscription_status="past_due",
        grace_period_end__isnull=False,
        grace_period_end__lt=now,
    )
    count = 0
    for user in users:
        user.subscription_plan = "discovery"
        user.subscription_status = "canceled"
        user.stripe_subscription_id = None
        user.subscription_current_period_end = None
        user.grace_period_end = None
        user.payment_failure_count = 0
        user.save(update_fields=[
            "subscription_plan",
            "subscription_status",
            "stripe_subscription_id",
            "subscription_current_period_end",
            "grace_period_end",
            "payment_failure_count",
        ])
        count += 1
    return count


@shared_task
def send_payment_failed_email(user_id: int) -> bool:
    """Send payment failure notification to a user."""
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return False

    context = {"user": user}
    return Email.send_db_template_email(
        template_name="payment_failed",
        context=context,
        recipient_list=[user.email],
        fail_silently=False,
    )


@shared_task
def send_subscription_canceled_email(user_id: int) -> bool:
    """Notify a user that their subscription was canceled."""
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return False

    context = {"user": user}
    return Email.send_db_template_email(
        template_name="subscription_canceled",
        context=context,
        recipient_list=[user.email],
        fail_silently=False,
    )
