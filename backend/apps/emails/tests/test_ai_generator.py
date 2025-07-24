from unittest.mock import MagicMock, patch

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient

from apps.emails.models import EmailTemplate


class GenerateTemplateTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        User = get_user_model()
        self.user = User.objects.create_user(
            email="test@example.com", name="Test", password="pass1234"
        )
        self.client.force_authenticate(user=self.user)
        self.url = reverse("emailtemplate-generate")
        self.override = self.settings(OPENAI_API_KEY="test")
        self.override.enable()

    def tearDown(self):
        self.override.disable()

    @patch("apps.emails.views.openai.OpenAI")
    def test_generate_template_creates_record(self, mock_openai):
        mock_client = MagicMock()
        mock_completion = MagicMock()
        mock_completion.choices = [
            MagicMock(
                message=MagicMock(
                    content='{"subject": "Hi", "content": "<p>Hello</p>"}'
                )
            )
        ]
        mock_client.chat.completions.create.return_value = mock_completion
        mock_openai.return_value = mock_client

        resp = self.client.post(
            self.url, {"prompt": "Welcome email", "name": "welcome"}, format="json"
        )
        self.assertEqual(resp.status_code, 201)
        self.assertEqual(EmailTemplate.objects.count(), 1)
        template = EmailTemplate.objects.first()
        self.assertEqual(template.name, "welcome")
        self.assertEqual(template.subject, "Hi")
        self.assertEqual(template.content, "<p>Hello</p>")
        call = mock_client.chat.completions.create.call_args[1]
        self.assertEqual(
            call["messages"], [{"role": "user", "content": "Welcome email"}]
        )

    def test_missing_api_key_returns_error(self):
        self.override.disable()
        resp = self.client.post(self.url, {"prompt": "Hi"}, format="json")
        self.assertEqual(resp.status_code, 503)
        self.override.enable()

