from celery import shared_task
from django.contrib.auth import get_user_model
from django.utils import timezone

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
        user.subscription_plan = "free"
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
