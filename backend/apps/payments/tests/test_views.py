from unittest.mock import MagicMock, patch

from django.apps import apps
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

User = get_user_model()


class PaymentViewsTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email="test@example.com",
            name="Test User",
            password="pass1234",
        )
        self.client.force_authenticate(user=self.user)

    def test_create_checkout_session_missing_plan(self):
        url = reverse("payments.create_checkout_session")
        response = self.client.post(url, {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_checkout_session_invalid_plan(self):
        url = reverse("payments.create_checkout_session")
        response = self.client.post(url, {"plan": "gold"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @patch("apps.payments.views.StripeService.create_checkout_session")
    def test_create_checkout_session_success(self, mock_create):
        mock_session = MagicMock(id="sess_1", url="http://stripe.test")
        mock_create.return_value = mock_session
        url = reverse("payments.create_checkout_session")
        response = self.client.post(url, {"plan": "basic"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["checkout_url"], "http://stripe.test")

    def test_cancel_subscription_no_active(self):
        url = reverse("payments.cancel_subscription")
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @patch("apps.payments.views.StripeService.cancel_subscription")
    def test_cancel_subscription_success(self, mock_cancel):
        self.user.stripe_subscription_id = "sub_1"
        self.user.subscription_plan = "basic"
        self.user.save()
        url = reverse("payments.cancel_subscription")
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(self.user.subscription_plan, "free")
        mock_cancel.assert_called_once_with("sub_1")

    def test_subscription_status(self):
        url = reverse("payments.subscription_status")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("subscription_plan", response.data)

    @patch("apps.payments.views.stripe.checkout.Session.retrieve")
    def test_verify_session_success(self, mock_retrieve):
        mock_retrieve.return_value = MagicMock(
            payment_status="paid", metadata={"plan": "basic"}
        )
        url = reverse("payments.verify_session") + "?session_id=sess_1"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["status"], "success")

    def test_verify_session_missing_id(self):
        url = reverse("payments.verify_session")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @patch("apps.payments.views.StripeService.update_subscription")
    def test_update_subscription(self, mock_update):
        self.user.stripe_subscription_id = "sub_1"
        self.user.save()
        url = reverse("payments.update_subscription")
        response = self.client.post(url, {"plan": "premium", "add_ons": []})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        mock_update.assert_called_once()

    @patch("apps.payments.views.StripeService.handle_successful_payment")
    @patch("apps.payments.views.stripe.Webhook.construct_event")
    def test_stripe_webhook_checkout_completed(self, mock_construct_event, mock_handle):
        event = {
            "type": "checkout.session.completed",
            "data": {"object": {"id": "sess_1"}},
        }
        mock_construct_event.return_value = event
        url = reverse("payments.stripe_webhook")
        response = self.client.post(url, data="{}", content_type="application/json")
        self.assertEqual(response.status_code, 200)
        mock_handle.assert_called_once()

    def test_list_add_ons(self):
        AddOn = apps.get_model('payments', 'AddOn')
        AddOn.objects.create(code="extra", stripe_price_id="price_extra")
        url = reverse("payments.add_on_list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["code"], "extra")

