import logging

import os

from .services import Email

logger = logging.getLogger(__name__)


def send_welcome_email(
    user_email: str, user_name: str
) -> bool:
    """
    Send a welcome email to a new user.

    Args:
        user_email: The email address of the new user
        user_name: The name of the new user
        dashboard_url: URL to the user dashboard (optional)

    Returns:
        bool: True if email was sent successfully, False otherwise
    """
    try:    
        dashboard_url = "https://app.royaltyx.co/"
        subject = "Welcome to RoyaltyX!"

        context = {
            "user_name": user_name,
            "dashboard_url": dashboard_url,
        }

        success = Email.send_template_email(
            subject=subject,
            template_name="emails/welcome.html",
            context=context,
            recipient_list=[user_email],
            fail_silently=False,
        )

        if success:
            logger.info(f"Welcome email sent successfully to {user_email}")
        else:
            logger.error(f"Failed to send welcome email to {user_email}")

        return success

    except Exception as e:
        logger.error(f"Error sending welcome email to {user_email}: {str(e)}")
        return False


def send_payment_failed_email(user_email: str, user_name: str) -> bool:
    """Send a payment failure notification email."""
    try:
        dashboard_url = os.getenv("REACT_APP_URL", "https://app.royaltyx.co")
        subject = "Payment Failed - Action Required"

        context = {
            "user_name": user_name,
            "dashboard_url": dashboard_url,
        }

        success = Email.send_template_email(
            subject=subject,
            template_name="emails/payment_failed.html",
            context=context,
            recipient_list=[user_email],
            fail_silently=False,
        )

        if success:
            logger.info(f"Payment failure email sent successfully to {user_email}")
        else:
            logger.error(f"Failed to send payment failure email to {user_email}")

        return success

    except Exception as e:
        logger.error(
            f"Error sending payment failure email to {user_email}: {str(e)}"
        )
        return False


def send_subscription_canceled_email(user_email: str, user_name: str) -> bool:
    """Send an email when a subscription is canceled."""
    try:
        dashboard_url = os.getenv("REACT_APP_URL", "https://app.royaltyx.co")
        subject = "Subscription Canceled"

        context = {
            "user_name": user_name,
            "dashboard_url": dashboard_url,
        }

        success = Email.send_template_email(
            subject=subject,
            template_name="emails/subscription_canceled.html",
            context=context,
            recipient_list=[user_email],
            fail_silently=False,
        )

        if success:
            logger.info(
                f"Subscription canceled email sent successfully to {user_email}"
            )
        else:
            logger.error(
                f"Failed to send subscription canceled email to {user_email}"
            )

        return success

    except Exception as e:
        logger.error(
            f"Error sending subscription canceled email to {user_email}: {str(e)}"
        )
        return False
