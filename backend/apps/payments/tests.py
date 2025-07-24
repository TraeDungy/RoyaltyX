from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase
from django.test.utils import override_settings
from rest_framework.test import APIClient
from rest_framework import status
from unittest.mock import patch
import json

User = get_user_model()


@override_settings(
    DATABASES={
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": ":memory:",
        }
    }
)
class PaymentViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email="test@example.com",
            name="Test User",
            password="strong-pass123",
        )
        self.client.force_authenticate(user=self.user)
        self.checkout_url = reverse("payments.create_checkout_session")
        self.cancel_url = reverse("payments.cancel_subscription")
        self.webhook_url = reverse("payments.stripe_webhook")

    @patch("apps.payments.views.StripeService.create_checkout_session")
    def test_create_checkout_session(self, mock_create):
        session_obj = type("obj", (), {"url": "https://checkout/123", "id": "sess_123"})
        mock_create.return_value = session_obj

        response = self.client.post(self.checkout_url, {"plan": "basic"}, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["checkout_url"], session_obj.url)
        self.assertEqual(response.data["session_id"], session_obj.id)
        mock_create.assert_called_once_with(self.user, "basic")

    @patch("apps.payments.views.StripeService.cancel_subscription")
    def test_cancel_subscription(self, mock_cancel):
        self.user.subscription_plan = "basic"
        self.user.stripe_subscription_id = "sub_123"
        self.user.subscription_status = "active"
        self.user.save()

        response = self.client.post(self.cancel_url, {})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        mock_cancel.assert_called_once_with("sub_123")
        self.user.refresh_from_db()
        self.assertEqual(self.user.subscription_plan, "free")
        self.assertEqual(self.user.subscription_status, "canceled")
        self.assertIsNone(self.user.stripe_subscription_id)

    @patch("apps.payments.views.StripeService.handle_successful_payment")
    @patch("apps.payments.views.stripe.Webhook.construct_event")
    def test_webhook_checkout_completed(self, mock_construct, mock_handle):
        event = {"type": "checkout.session.completed", "data": {"object": {"id": "cs_1"}}}
        mock_construct.return_value = event

        payload = json.dumps({})
        response = self.client.post(
            self.webhook_url,
            data=payload,
            content_type="application/json",
            HTTP_STRIPE_SIGNATURE="test",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        mock_handle.assert_called_once_with(event["data"]["object"])

    @patch("apps.payments.views.StripeService.handle_payment_failed")
    @patch("apps.payments.views.stripe.Webhook.construct_event")
    def test_webhook_payment_failed(self, mock_construct, mock_handle):
        event = {"type": "invoice.payment_failed", "data": {"object": {"id": "inv_1"}}}
        mock_construct.return_value = event

        response = self.client.post(
            self.webhook_url,
            data=json.dumps({}),
            content_type="application/json",
            HTTP_STRIPE_SIGNATURE="test",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        mock_handle.assert_called_once_with(event["data"]["object"])

    @patch("apps.payments.views.StripeService.handle_subscription_deleted")
    @patch("apps.payments.views.stripe.Webhook.construct_event")
    def test_webhook_subscription_deleted(self, mock_construct, mock_handle):
        event = {"type": "customer.subscription.deleted", "data": {"object": {"id": "sub_1"}}}
        mock_construct.return_value = event

        response = self.client.post(
            self.webhook_url,
            data=json.dumps({}),
            content_type="application/json",
            HTTP_STRIPE_SIGNATURE="test",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        mock_handle.assert_called_once_with(event["data"]["object"])
