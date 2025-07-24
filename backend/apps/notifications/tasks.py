from celery import shared_task

from .sms_service import SMSService


@shared_task
def send_sms_task(body: str, to: str) -> bool:
    """Asynchronously send an SMS message."""
    return SMSService.send_message(body, to)
