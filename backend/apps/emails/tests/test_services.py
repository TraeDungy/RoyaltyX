from unittest.mock import MagicMock, patch

from django.test import TestCase

from apps.emails.models import EmailTemplate
from apps.emails.services import Email


class EmailServiceTests(TestCase):
    @patch("apps.emails.services.send_mail")
    def test_send_simple_email(self, mock_send):
        result = Email.send("Hi", "Body", ["test@example.com"])
        self.assertTrue(result)
        mock_send.assert_called_once()

    @patch("apps.emails.services.EmailMultiAlternatives")
    def test_send_html_email(self, mock_email_cls):
        mock_email = MagicMock()
        mock_email_cls.return_value = mock_email
        result = Email.send_html_email("Hi", "<p>Body</p>", ["test@example.com"])
        self.assertTrue(result)
        mock_email.attach_alternative.assert_called_once_with("<p>Body</p>", "text/html")
        mock_email.send.assert_called_once()

    @patch("apps.emails.services.EmailMultiAlternatives")
    def test_send_db_template_email(self, mock_email_cls):
        template = EmailTemplate.objects.create(
            name="welcome",
            subject="Welcome",
            content="<p>Hello {{name}}</p>",
        )
        mock_email = MagicMock()
        mock_email_cls.return_value = mock_email
        result = Email.send_db_template_email(
            "welcome",
            {"name": "Tester"},
            ["user@example.com"],
        )
        self.assertTrue(result)
        mock_email.send.assert_called_once()
