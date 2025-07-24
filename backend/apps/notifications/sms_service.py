import logging
import os

from twilio.rest import Client

logger = logging.getLogger(__name__)


class SMSService:
    """Simple wrapper around the Twilio client."""

    @staticmethod
    def send_message(body: str, to: str) -> bool:
        """Send a text message using Twilio."""
        account_sid = os.getenv("TWILIO_ACCOUNT_SID")
        auth_token = os.getenv("TWILIO_AUTH_TOKEN")
        from_number = os.getenv("TWILIO_PHONE_NUMBER")

        if not all([account_sid, auth_token, from_number]):
            logger.error("Twilio credentials not configured")
            return False

        try:
            client = Client(account_sid, auth_token)
            client.messages.create(body=body, from_=from_number, to=to)
            logger.info("Sent SMS to %s", to)
            return True
        except Exception as exc:
            logger.error("Failed to send SMS: %s", exc)
            return False
