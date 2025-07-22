from unittest.mock import patch

from django.contrib.auth import get_user_model
from django.test import TestCase

from apps.payments.stripe_service import StripeService


class StripeServiceEmailTests(TestCase):
    def setUp(self):
        User = get_user_model()
        self.user = User.objects.create_user(
            email="test@example.com",
            name="Test User",
            password="testpass123",
        )
        self.user.stripe_subscription_id = "sub_test"
        self.user.save()

    @patch("apps.payments.stripe_service.send_welcome_email")
    def test_handle_payment_failed_sends_email(self, mock_send_email):
        invoice = {"subscription": "sub_test"}
        StripeService.handle_payment_failed(invoice)
        mock_send_email.assert_called_once_with(
            user_email=self.user.email,
            user_name=self.user.name or self.user.username,
        )

    @patch("apps.payments.stripe_service.send_welcome_email")
    def test_handle_subscription_deleted_sends_email(self, mock_send_email):
        subscription = {"id": "sub_test"}
        StripeService.handle_subscription_deleted(subscription)
        mock_send_email.assert_called_once_with(
            user_email=self.user.email,
            user_name=self.user.name or self.user.username,
        )
