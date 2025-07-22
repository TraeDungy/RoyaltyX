import os
from unittest.mock import MagicMock, patch

from django.contrib.auth import get_user_model
from django.test import TestCase, override_settings

from apps.payments.stripe_service import StripeService

User = get_user_model()

@override_settings(
    DATABASES={
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": ":memory:",
        }
    }
)
class StripeServiceTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="user@example.com", name="User", password="password"
        )
        os.environ.setdefault("STRIPE_BASIC_PRICE_ID", "price_basic")
        os.environ.setdefault("STRIPE_PREMIUM_PRICE_ID", "price_premium")
        os.environ.setdefault("REACT_APP_URL", "http://localhost:3000")

    def test_get_price_id_for_plan(self):
        self.assertEqual(StripeService.get_price_id_for_plan("basic"), "price_basic")
        self.assertEqual(StripeService.get_price_id_for_plan("premium"), "price_premium")
        self.assertIsNone(StripeService.get_price_id_for_plan("invalid"))

    @patch("apps.payments.stripe_service.stripe.checkout.Session.create")
    @patch.object(StripeService, "get_or_create_customer")
    def test_create_checkout_session(self, mock_customer, mock_session_create):
        mock_customer.return_value = MagicMock(id="cus_123")
        mock_session_create.return_value = MagicMock(id="sess_123", url="https://stripe.test/sess_123")

        session = StripeService.create_checkout_session(self.user, "basic")

        mock_session_create.assert_called_once()
        self.assertEqual(session.id, "sess_123")
        self.assertEqual(session.url, "https://stripe.test/sess_123")

    @patch.object(StripeService, "cancel_subscription")
    @patch("apps.payments.stripe_service.stripe.Subscription.retrieve")
    def test_handle_successful_payment(self, mock_retrieve, mock_cancel):
        mock_retrieve.return_value = MagicMock(id="sub_new", current_period_end=1710000000)
        session = {
            "metadata": {"user_id": self.user.id, "plan": "premium"},
            "subscription": "sub_new",
        }
        user = StripeService.handle_successful_payment(session)

        self.assertEqual(user.subscription_plan, "premium")
        self.assertEqual(user.subscription_status, "active")
        self.assertEqual(user.stripe_subscription_id, "sub_new")
        self.assertEqual(user.payment_failure_count, 0)
        self.assertIsNone(user.grace_period_end)
        self.assertIsNotNone(user.subscription_current_period_end)

    def test_handle_successful_payment_user_not_found(self):
        session = {"metadata": {"user_id": 9999, "plan": "basic"}, "subscription": "sub"}
        with self.assertRaises(Exception):
            StripeService.handle_successful_payment(session)

    def test_handle_payment_failed(self):
        self.user.stripe_subscription_id = "sub_123"
        self.user.save()

        invoice = {"subscription": "sub_123"}
        user = StripeService.handle_payment_failed(invoice)

        self.assertEqual(user.subscription_status, "past_due")
        self.assertEqual(user.payment_failure_count, 1)

    def test_handle_payment_failed_user_not_found(self):
        invoice = {"subscription": "missing"}
        with self.assertRaises(Exception):
            StripeService.handle_payment_failed(invoice)

    def test_handle_subscription_deleted(self):
        self.user.stripe_subscription_id = "sub_del"
        self.user.subscription_plan = "basic"
        self.user.subscription_status = "active"
        self.user.save()

        subscription = {"id": "sub_del"}
        user = StripeService.handle_subscription_deleted(subscription)

        self.assertEqual(user.subscription_plan, "free")
        self.assertEqual(user.subscription_status, "canceled")
        self.assertIsNone(user.stripe_subscription_id)

    def test_handle_subscription_deleted_user_not_found(self):
        subscription = {"id": "nope"}
        with self.assertRaises(Exception):
            StripeService.handle_subscription_deleted(subscription)
