from unittest.mock import MagicMock, patch

from django.contrib.auth import get_user_model
from django.test import TestCase

from apps.payments.stripe_service import StripeService

User = get_user_model()


class StripeServiceTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="service@example.com",
            name="Service User",
            password="pass1234",
        )

    @patch("apps.payments.stripe_service.stripe.Customer.create")
    def test_create_customer(self, mock_create):
        mock_create.return_value = MagicMock(id="cust_1")
        customer = StripeService.create_customer(self.user)
        self.assertEqual(customer.id, "cust_1")
        mock_create.assert_called_once()
        self.user.refresh_from_db()
        self.assertEqual(self.user.stripe_customer_id, "cust_1")

    def test_get_price_id_for_plan(self):
        with patch.dict("os.environ", {"STRIPE_BASIC_PRICE_ID": "price_basic"}):
            self.assertEqual(
                StripeService.get_price_id_for_plan("basic"), "price_basic"
            )
            self.assertIsNone(StripeService.get_price_id_for_plan("premium"))

    @patch("apps.payments.stripe_service.stripe.Subscription.delete")
    def test_cancel_subscription(self, mock_delete):
        StripeService.cancel_subscription("sub_1")
        mock_delete.assert_called_once_with("sub_1")
