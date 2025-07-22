import logging
import os

from .tasks import task_send_db_template_email

logger = logging.getLogger(__name__)


def send_welcome_email(
    user_email: str,
    user_name: str,
) -> bool:
    """
    Send a welcome email to a new user.

    Args:
        user_email: The email address of the new user
        user_name: The name of the new user

    Returns:
        bool: True if email was sent successfully, False otherwise
    """
    try:    
        dashboard_url = os.getenv("REACT_APP_URL", "https://app.royaltyx.co")

        context = {
            "user_name": user_name,
            "dashboard_url": dashboard_url,
        }

        task_send_db_template_email.delay(
            template_name="welcome",
            context=context,
            recipient_list=[user_email],
            fail_silently=False,
        )

        logger.info(f"Queued welcome email to {user_email}")
        return True

    except Exception as e:
        logger.error(f"Error sending welcome email to {user_email}: {str(e)}")
        return False
