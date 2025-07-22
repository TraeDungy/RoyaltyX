from unittest.mock import MagicMock, patch

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

User = get_user_model()


class PaymentViewsTests(TestCase):
    """Tests for the payment related API views."""

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email="test@example.com", name="Test User", password="testpass123"
        )
        self.client.force_authenticate(user=self.user)

        self.checkout_url = reverse("payments.create_checkout_session")
        self.cancel_url = reverse("payments.cancel_subscription")
        self.status_url = reverse("payments.subscription_status")
        self.verify_url = reverse("payments.verify_session")

    @patch("apps.payments.views.StripeService.create_checkout_session")
    def test_create_checkout_session_success(self, mock_create_session):
        """A checkout session is created when a valid plan is provided."""
        mock_session = MagicMock(url="http://stripe/checkout", id="sess_123")
        mock_create_session.return_value = mock_session

        response = self.client.post(self.checkout_url, {"plan": "basic"}, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["checkout_url"], "http://stripe/checkout")
        self.assertEqual(response.data["session_id"], "sess_123")
        mock_create_session.assert_called_once_with(self.user, "basic")

    def test_create_checkout_session_missing_plan(self):
        """If no plan is sent the endpoint returns a 400 response."""
        response = self.client.post(self.checkout_url, {}, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Plan is required", response.data["error"])

    def test_create_checkout_session_invalid_plan(self):
        """An invalid plan value results in a 400 response."""
        response = self.client.post(self.checkout_url, {"plan": "gold"}, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Invalid plan", response.data["error"])

    def test_create_checkout_session_when_already_on_plan(self):
        """Trying to switch to the current plan should fail."""
        self.user.subscription_plan = "basic"
        self.user.save()

        response = self.client.post(self.checkout_url, {"plan": "basic"}, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("already on the basic plan", response.data["error"])

    @patch("apps.payments.views.StripeService.cancel_subscription")
    def test_cancel_subscription_success(self, mock_cancel):
        """Cancelling an active subscription resets the user plan."""
        self.user.stripe_subscription_id = "sub_123"
        self.user.subscription_plan = "premium"
        self.user.save()

        response = self.client.post(self.cancel_url, {}, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["subscription_plan"], "free")
        mock_cancel.assert_called_once_with("sub_123")

        self.user.refresh_from_db()
        self.assertEqual(self.user.subscription_plan, "free")
        self.assertEqual(self.user.subscription_status, "canceled")
        self.assertIsNone(self.user.stripe_subscription_id)

    def test_cancel_subscription_without_active_subscription(self):
        """Attempting to cancel without an active subscription returns 400."""
        response = self.client.post(self.cancel_url, {}, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("No active subscription", response.data["error"])

    @patch("apps.payments.views.stripe.checkout.Session.retrieve")
    def test_verify_session_paid(self, mock_retrieve):
        """A successful payment session returns status success."""
        mock_session = MagicMock(payment_status="paid", metadata={"plan": "basic"})
        mock_retrieve.return_value = mock_session

        response = self.client.get(self.verify_url, {"session_id": "sess_123"})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["status"], "success")
        self.assertEqual(response.data["plan"], "basic")

    def test_verify_session_missing_session_id(self):
        """If session_id is missing the endpoint returns a 400 error."""
        response = self.client.get(self.verify_url)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Session ID is required", response.data["error"])

    def test_subscription_status_view(self):
        """The subscription status endpoint returns the user's details."""
        self.user.subscription_plan = "premium"
        self.user.subscription_status = "active"
        self.user.stripe_customer_id = "cus_123"
        self.user.stripe_subscription_id = "sub_123"
        self.user.payment_failure_count = 0
        self.user.save()

        response = self.client.get(self.status_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["subscription_plan"], "premium")
        self.assertEqual(response.data["subscription_status"], "active")
        self.assertEqual(response.data["stripe_customer_id"], "cus_123")
        self.assertEqual(response.data["stripe_subscription_id"], "sub_123")
