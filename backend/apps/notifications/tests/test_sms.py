from unittest.mock import patch

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient

User = get_user_model()


class SMSFeatureTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email="sms@example.com",
            name="SMS User",
            password="pass1234",
        )
        self.user.phone_number = "+15555555555"
        self.user.save()
        self.client.force_authenticate(user=self.user)
        self.url = reverse("notifications-send-sms")

    def test_sms_requires_premium(self):
        response = self.client.post(self.url, {"message": "Hi"})
        self.assertEqual(response.status_code, 402)
        self.assertTrue(response.data.get("requires_payment"))

    @patch("apps.notifications.views.send_sms_task")
    def test_sms_sent_successfully(self, mock_task):
        self.user.subscription_plan = "premium"
        self.user.save()
        response = self.client.post(self.url, {"message": "Hi"})
        self.assertEqual(response.status_code, 200)
        mock_task.delay.assert_called_once_with("Hi", self.user.phone_number)

    def test_sms_missing_message(self):
        self.user.subscription_plan = "premium"
        self.user.save()
        response = self.client.post(self.url, {})
        self.assertEqual(response.status_code, 400)
