from unittest.mock import MagicMock, patch

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient

from apps.support.models import HelpChatThread


class HelpChatTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        User = get_user_model()
        self.user = User.objects.create_user(
            email="test@example.com", name="Test", password="pass1234"
        )
        self.client.force_authenticate(user=self.user)
        self.url = reverse("support:help-chat")
        # Ensure API key is present so the view doesn't reject the request
        self.override = self.settings(OPENAI_API_KEY="test")
        self.override.enable()

    def tearDown(self):
        self.override.disable()

    @patch("apps.support.views.openai.OpenAI")
    def test_conversation_persists(self, mock_openai):
        mock_client = MagicMock()
        mock_completion = MagicMock()
        mock_completion.choices = [MagicMock(message=MagicMock(content="Hi"))]
        mock_client.chat.completions.create.return_value = mock_completion
        mock_openai.return_value = mock_client

        resp1 = self.client.post(self.url, {"question": "Hello"}, format="json")
        self.assertEqual(resp1.status_code, 200)
        thread_id = resp1.data["thread_id"]
        thread = HelpChatThread.objects.get(id=thread_id)
        self.assertEqual(thread.messages.count(), 2)

        call1 = mock_client.chat.completions.create.call_args_list[0]
        self.assertEqual(
            call1.kwargs["messages"], [{"role": "user", "content": "Hello"}]
        )

        mock_completion2 = MagicMock()
        mock_completion2.choices = [MagicMock(message=MagicMock(content="Sure"))]
        mock_client.chat.completions.create.return_value = mock_completion2

        resp2 = self.client.post(
            self.url,
            {"question": "Another", "thread_id": thread_id},
            format="json",
        )
        self.assertEqual(resp2.status_code, 200)
        thread.refresh_from_db()
        self.assertEqual(thread.messages.count(), 4)

        call2 = mock_client.chat.completions.create.call_args_list[1]
        self.assertEqual(
            call2.kwargs["messages"],
            [
                {"role": "user", "content": "Hello"},
                {"role": "assistant", "content": "Hi"},
                {"role": "user", "content": "Another"},
            ],
        )
