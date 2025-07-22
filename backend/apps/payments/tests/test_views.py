import json
from unittest.mock import MagicMock, patch

from django.contrib.auth import get_user_model
from django.test import TestCase, override_settings
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

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
            email="user@example.com", name="User", password="password"
        )
        self.client.force_authenticate(user=self.user)
        self.url = reverse("payments.create_checkout_session")
        self.webhook_url = reverse("payments.stripe_webhook")

    @patch("apps.payments.views.StripeService.create_checkout_session")
    def test_create_checkout_session_success(self, mock_create):
        mock_create.return_value = MagicMock(id="sess_123", url="https://stripe.test/sess")
        response = self.client.post(self.url, {"plan": "basic"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("checkout_url", response.data)
        self.assertIn("session_id", response.data)

    def test_create_checkout_session_missing_plan(self):
        response = self.client.post(self.url, {}, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_checkout_session_invalid_plan(self):
        response = self.client.post(self.url, {"plan": "gold"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_checkout_session_already_on_plan(self):
        self.user.subscription_plan = "basic"
        self.user.save()
        response = self.client.post(self.url, {"plan": "basic"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @patch("apps.payments.views.StripeService.create_checkout_session", side_effect=Exception("boom"))
    def test_create_checkout_session_service_error(self, mock_create):
        response = self.client.post(self.url, {"plan": "premium"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertIn("error", response.data)

    @patch("apps.payments.views.StripeService.handle_successful_payment")
    @patch("apps.payments.views.stripe.Webhook.construct_event")
    def test_webhook_checkout_completed(self, mock_construct, mock_handle):
        event = {
            "type": "checkout.session.completed",
            "data": {"object": {"id": "sess", "subscription": "sub"}},
        }
        mock_construct.return_value = event
        resp = self.client.post(self.webhook_url, data=json.dumps(event), content_type="application/json")
        self.assertEqual(resp.status_code, 200)
        mock_handle.assert_called_once()

    @patch("apps.payments.views.StripeService.handle_payment_failed")
    @patch("apps.payments.views.stripe.Webhook.construct_event")
    def test_webhook_payment_failed(self, mock_construct, mock_handle):
        event = {
            "type": "invoice.payment_failed",
            "data": {"object": {"id": "inv"}},
        }
        mock_construct.return_value = event
        resp = self.client.post(self.webhook_url, data=json.dumps(event), content_type="application/json")
        self.assertEqual(resp.status_code, 200)
        mock_handle.assert_called_once()

    @patch("apps.payments.views.StripeService.handle_subscription_deleted")
    @patch("apps.payments.views.stripe.Webhook.construct_event")
    def test_webhook_subscription_deleted(self, mock_construct, mock_handle):
        event = {
            "type": "customer.subscription.deleted",
            "data": {"object": {"id": "sub"}},
        }
        mock_construct.return_value = event
        resp = self.client.post(self.webhook_url, data=json.dumps(event), content_type="application/json")
        self.assertEqual(resp.status_code, 200)
        mock_handle.assert_called_once()

    @patch("apps.payments.views.stripe.Webhook.construct_event")
    def test_webhook_subscription_updated(self, mock_construct):
        event = {
            "type": "customer.subscription.updated",
            "data": {"object": {"id": "sub", "status": "past_due"}},
        }
        mock_construct.return_value = event
        self.user.stripe_subscription_id = "sub"
        self.user.save()
        resp = self.client.post(self.webhook_url, data=json.dumps(event), content_type="application/json")
        self.assertEqual(resp.status_code, 200)
        self.user.refresh_from_db()
        self.assertEqual(self.user.subscription_status, "past_due")

    @patch("apps.payments.views.stripe.Webhook.construct_event", side_effect=ValueError("bad"))
    def test_webhook_invalid_payload(self, mock_construct):
        resp = self.client.post(self.webhook_url, data="{}", content_type="application/json")
        self.assertEqual(resp.status_code, 400)

