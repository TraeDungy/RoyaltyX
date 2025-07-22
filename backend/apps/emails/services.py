import logging
from typing import Any, Dict, List, Optional

from django.conf import settings
from django.core.mail import EmailMultiAlternatives, send_mail
from django.template import Context, Template
from django.template.loader import render_to_string
from django.utils.html import strip_tags

from .models import EmailTemplate

logger = logging.getLogger(__name__)


class Email:
    """
    Service class for handling email operations in the RoyaltyX application.
    Provides methods for sending various types of emails with support for
    HTML templates, attachments, and bulk operations.
    """

    @staticmethod
    def send(
        subject: str,
        message: str,
        recipient_list: List[str],
        from_email: Optional[str] = None,
        fail_silently: bool = False,
    ) -> bool:
        """
        Send a simple text email.

        Args:
            subject: Email subject
            message: Email message content
            recipient_list: List of recipient email addresses
            from_email: Sender email address (defaults to DEFAULT_FROM_EMAIL)
            fail_silently: Whether to suppress exceptions

        Returns:
            bool: True if email was sent successfully, False otherwise
        """
        try:
            from_email = from_email or settings.DEFAULT_FROM_EMAIL

            send_mail(
                subject=subject,
                message=message,
                from_email=from_email,
                recipient_list=recipient_list,
                fail_silently=fail_silently,
            )

            logger.info(
                f"Simple email sent successfully to {len(recipient_list)} recipients"
            )
            return True

        except Exception as e:
            logger.error(f"Failed to send simple email: {str(e)}")
            if not fail_silently:
                raise
            return False

    @staticmethod
    def send_html_email(
        subject: str,
        html_content: str,
        recipient_list: List[str],
        text_content: Optional[str] = None,
        from_email: Optional[str] = None,
        fail_silently: bool = False,
    ) -> bool:
        """
        Send an HTML email with optional text fallback.

        Args:
            subject: Email subject
            html_content: HTML email content
            recipient_list: List of recipient email addresses
            text_content: Plain text fallback (auto-generated if not provided)
            from_email: Sender email address (defaults to DEFAULT_FROM_EMAIL)
            fail_silently: Whether to suppress exceptions

        Returns:
            bool: True if email was sent successfully, False otherwise
        """
        try:
            from_email = from_email or settings.DEFAULT_FROM_EMAIL

            # Auto-generate text content if not provided
            if not text_content:
                text_content = strip_tags(html_content)

            email = EmailMultiAlternatives(
                subject=subject,
                body=text_content,
                from_email=from_email,
                to=recipient_list,
            )
            email.attach_alternative(html_content, "text/html")
            email.send(fail_silently=fail_silently)

            logger.info(
                f"HTML email sent successfully to {len(recipient_list)} recipients"
            )
            return True

        except Exception as e:
            logger.error(f"Failed to send HTML email: {str(e)}")
            if not fail_silently:
                raise
            return False

    @staticmethod
    def send_template_email(
        subject: str,
        template_name: str,
        context: Dict[str, Any],
        recipient_list: List[str],
        from_email: Optional[str] = None,
        fail_silently: bool = False,
    ) -> bool:
        """
        Send an email using a Django template.

        Args:
            subject: Email subject
            template_name: Path to the email template
            context: Template context variables
            recipient_list: List of recipient email addresses
            from_email: Sender email address (defaults to DEFAULT_FROM_EMAIL)
            fail_silently: Whether to suppress exceptions

        Returns:
            bool: True if email was sent successfully, False otherwise
        """
        try:
            from_email = from_email or settings.DEFAULT_FROM_EMAIL

            template_obj = (
                EmailTemplate.objects.filter(name=template_name, is_active=True)
                .order_by("-version")
                .first()
            )

            if template_obj:
                django_template = Template(template_obj.content)
                html_content = django_template.render(Context(context))
            else:
                html_content = render_to_string(template_name, context)

            text_content = strip_tags(html_content)

            email = EmailMultiAlternatives(
                subject=subject,
                body=text_content,
                from_email=from_email,
                to=recipient_list,
            )
            email.attach_alternative(html_content, "text/html")
            email.send(fail_silently=fail_silently)

            logger.info(
                f"Template email sent successfully to {len(recipient_list)} recipients"
            )
            return True

        except Exception as e:
            logger.error(f"Failed to send template email: {str(e)}")
            if not fail_silently:
                raise
            return False
