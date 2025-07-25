from unittest.mock import MagicMock, patch

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient

from apps.payments.models import AddOn
from apps.payments.stripe_service import StripeService

User = get_user_model()


class PaymentRegressionTests(TestCase):
    """Additional payment related tests to avoid regressions."""

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email="session@example.com",
            name="Session User",
            password="pass1234",
        )

    @patch("apps.payments.stripe_service.StripeService.get_or_create_customer")
    @patch("apps.payments.stripe_service.stripe.checkout.Session.create")
    def test_create_checkout_session_with_addons(self, mock_create, mock_get_or_create):
        """Session is created with correct line items when add-ons are used."""

        addon = AddOn.objects.create(code="extra", stripe_price_id="price_add")

        mock_get_or_create.return_value = MagicMock(id="cust_1")
        mock_create.return_value = MagicMock(id="sess_1", url="http://stripe")

        with patch.dict(
            "os.environ",
            {"STRIPE_PROFESSIONAL_PRICE_ID": "price_prof", "REACT_APP_URL": "http://x"},
        ):
            session = StripeService.create_checkout_session(self.user, "professional", [addon])

        self.assertEqual(session.id, "sess_1")
        mock_create.assert_called_once()
        args, kwargs = mock_create.call_args
        self.assertEqual(kwargs["customer"], "cust_1")
        self.assertEqual(
            kwargs["line_items"],
            [
                {"price": "price_prof", "quantity": 1},
                {"price": "price_add", "quantity": 1},
            ],
        )

    @patch("apps.payments.stripe_service.stripe.Subscription.modify")
    @patch("apps.payments.stripe_service.stripe.Subscription.retrieve")
    def test_update_subscription_with_addons(self, mock_retrieve, mock_modify):
        """Updating the subscription also attaches add-ons."""

        addon = AddOn.objects.create(code="support", stripe_price_id="price_add")

        self.user.stripe_subscription_id = "sub_1"
        self.user.stripe_subscription_item_id = "si_1"

        mock_retrieve.return_value = {
            "items": {"data": [{"id": "si_1", "price": {"id": "price_old"}}]},
            "status": "active",
            "current_period_end": 123456,
        }
        mock_modify.return_value = mock_retrieve.return_value

        with patch.dict("os.environ", {"STRIPE_PREMIUM_PRICE_ID": "price_new"}):
            StripeService.update_subscription(self.user, "premium", [addon])

        mock_modify.assert_called_once_with(
            "sub_1",
            cancel_at_period_end=False,
            proration_behavior="create_prorations",
            items=[
                {"id": "si_1", "price": "price_new"},
                {"price": "price_add", "quantity": 1},
            ],
        )
        self.user.refresh_from_db()
        self.assertEqual(self.user.subscription_plan, "premium")
        self.assertIn(addon, self.user.add_ons.all())

    @patch("apps.payments.views.StripeService.handle_payment_failed")
    @patch("apps.payments.views.stripe.Webhook.construct_event")
    def test_webhook_payment_failed(self, mock_construct_event, mock_handle):
        """Webhook routes invoice failures to the handler."""

        event = {
            "type": "invoice.payment_failed",
            "data": {"object": {"id": "in_1"}},
        }
        mock_construct_event.return_value = event

        url = reverse("payments.stripe_webhook")
        response = self.client.post(url, data="{}", content_type="application/json")

        self.assertEqual(response.status_code, 200)
        mock_handle.assert_called_once_with({"id": "in_1"})

    @patch("apps.payments.views.stripe.Webhook.construct_event")
    def test_webhook_subscription_updated(self, mock_construct_event):
        """User subscription status is updated when Stripe notifies us."""

        self.user.stripe_subscription_id = "sub_1"
        self.user.subscription_status = "active"
        self.user.save()

        event = {
            "type": "customer.subscription.updated",
            "data": {"object": {"id": "sub_1", "status": "past_due"}},
        }
        mock_construct_event.return_value = event

        url = reverse("payments.stripe_webhook")
        self.client.post(url, data="{}", content_type="application/json")

        self.user.refresh_from_db()
        self.assertEqual(self.user.subscription_status, "past_due")
