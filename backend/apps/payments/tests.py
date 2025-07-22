from unittest.mock import patch, Mock

from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient

from .stripe_service import StripeService

User = get_user_model()


class StripeServiceTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="test@example.com",
            name="Test User",
            password="password123",
        )

    @patch("apps.payments.stripe_service.stripe.Subscription.retrieve")
    def test_handle_successful_payment_updates_user(self, mock_retrieve):
        mock_retrieve.return_value = Mock(id="sub_123", current_period_end=1710000000)
        session = {
            "metadata": {"user_id": self.user.id, "plan": "basic"},
            "subscription": "sub_123",
        }

        returned_user = StripeService.handle_successful_payment(session)

        self.user.refresh_from_db()
        self.assertEqual(returned_user.id, self.user.id)
        self.assertEqual(self.user.subscription_plan, "basic")
        self.assertEqual(self.user.subscription_status, "active")
        self.assertEqual(self.user.stripe_subscription_id, "sub_123")
        self.assertEqual(self.user.payment_failure_count, 0)
        self.assertIsNone(self.user.grace_period_end)

    def test_handle_payment_failed_updates_user(self):
        self.user.stripe_subscription_id = "sub_123"
        self.user.save()

        invoice = {"subscription": "sub_123"}
        StripeService.handle_payment_failed(invoice)

        self.user.refresh_from_db()
        self.assertEqual(self.user.subscription_status, "past_due")
        self.assertEqual(self.user.payment_failure_count, 1)

    def test_handle_subscription_deleted_downgrades_user(self):
        self.user.subscription_plan = "premium"
        self.user.subscription_status = "active"
        self.user.stripe_subscription_id = "sub_123"
        self.user.save()

        StripeService.handle_subscription_deleted({"id": "sub_123"})

        self.user.refresh_from_db()
        self.assertEqual(self.user.subscription_plan, "free")
        self.assertEqual(self.user.subscription_status, "canceled")
        self.assertIsNone(self.user.stripe_subscription_id)


class PaymentViewsTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email="view@test.com",
            name="View User",
            password="password123",
        )
        self.client.force_authenticate(user=self.user)
        self.create_url = reverse("payments.create_checkout_session")
        self.cancel_url = reverse("payments.cancel_subscription")
        self.status_url = reverse("payments.subscription_status")
        self.verify_url = reverse("payments.verify_session")
        self.webhook_url = reverse("payments.stripe_webhook")

    @patch("apps.payments.views.StripeService.create_checkout_session")
    def test_create_checkout_session(self, mock_create):
        mock_create.return_value = Mock(id="sess_123", url="http://checkout")

        response = self.client.post(self.create_url, {"plan": "basic"}, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["session_id"], "sess_123")
        self.assertEqual(response.data["checkout_url"], "http://checkout")
        mock_create.assert_called_once()

    def test_create_checkout_session_missing_plan(self):
        response = self.client.post(self.create_url, {}, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @patch("apps.payments.views.StripeService.cancel_subscription")
    def test_cancel_subscription(self, mock_cancel):
        self.user.subscription_plan = "basic"
        self.user.subscription_status = "active"
        self.user.stripe_subscription_id = "sub_123"
        self.user.save()

        response = self.client.post(self.cancel_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        mock_cancel.assert_called_once_with("sub_123")
        self.user.refresh_from_db()
        self.assertEqual(self.user.subscription_plan, "free")
        self.assertEqual(self.user.subscription_status, "canceled")
        self.assertIsNone(self.user.stripe_subscription_id)

    def test_cancel_subscription_without_active(self):
        response = self.client.post(self.cancel_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_subscription_status(self):
        self.user.subscription_plan = "premium"
        self.user.subscription_status = "active"
        self.user.stripe_customer_id = "cust_123"
        self.user.stripe_subscription_id = "sub_123"
        self.user.save()

        response = self.client.get(self.status_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["subscription_plan"], "premium")
        self.assertEqual(response.data["subscription_status"], "active")
        self.assertEqual(response.data["stripe_customer_id"], "cust_123")
        self.assertEqual(response.data["stripe_subscription_id"], "sub_123")

    @patch("apps.payments.views.stripe.checkout.Session.retrieve")
    def test_verify_session_paid(self, mock_retrieve):
        mock_retrieve.return_value = Mock(payment_status="paid", metadata={"plan": "basic"})

        response = self.client.get(self.verify_url + "?session_id=sess_123")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["status"], "success")
        self.assertEqual(response.data["plan"], "basic")

    def test_verify_session_missing_id(self):
        response = self.client.get(self.verify_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @patch("apps.payments.views.StripeService.handle_successful_payment")
    @patch("apps.payments.views.stripe.Webhook.construct_event")
    def test_stripe_webhook_checkout_completed(self, mock_construct, mock_handle):
        event = {
            "type": "checkout.session.completed",
            "data": {"object": {"id": "cs_123", "subscription": "sub_123", "metadata": {"user_id": self.user.id, "plan": "basic"}}},
        }
        mock_construct.return_value = event

        response = self.client.post(
            self.webhook_url,
            "{}",
            content_type="application/json",
            HTTP_STRIPE_SIGNATURE="sig",
        )

        self.assertEqual(response.status_code, 200)
        mock_handle.assert_called_once()
