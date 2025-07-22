from celery import shared_task

from .utils import (
    send_payment_failed_email,
    send_subscription_canceled_email,
)


@shared_task
def task_send_payment_failed_email(user_email: str, user_name: str) -> bool:
    """Celery task to send payment failure email."""
    return send_payment_failed_email(user_email=user_email, user_name=user_name)


@shared_task
def task_send_subscription_canceled_email(user_email: str, user_name: str) -> bool:
    """Celery task to send subscription canceled email."""
    return send_subscription_canceled_email(
        user_email=user_email, user_name=user_name
    )

