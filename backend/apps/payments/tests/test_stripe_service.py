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

    @patch("apps.payments.stripe_service.stripe.Subscription.modify")
    @patch("apps.payments.stripe_service.stripe.Subscription.retrieve")
    def test_update_subscription(self, mock_retrieve, mock_modify):
        self.user.stripe_subscription_id = "sub_1"
        self.user.stripe_subscription_item_id = "si_1"
        mock_retrieve.return_value = {
            "items": {"data": [{"id": "si_1", "price": {"id": "price_old"}}]},
            "status": "active",
            "current_period_end": 123456,
        }
        mock_modify.return_value = mock_retrieve.return_value
        with patch.dict("os.environ", {"STRIPE_PREMIUM_PRICE_ID": "price_new"}):
            StripeService.update_subscription(self.user, "premium", [])

        mock_modify.assert_called_once()
        self.user.refresh_from_db()
        self.assertEqual(self.user.subscription_plan, "premium")

    @patch("apps.payments.stripe_service.stripe.Invoice.list")
    def test_list_invoices(self, mock_list):
        self.user.stripe_customer_id = "cus_1"
        mock_list.return_value = {"data": []}
        invoices = StripeService.list_invoices(self.user)
        self.assertEqual(invoices, [])
        mock_list.assert_called_once()

    @patch("apps.payments.stripe_service.stripe.Customer.retrieve")
    @patch("apps.payments.stripe_service.stripe.PaymentMethod.list")
    def test_list_payment_methods(self, mock_list, mock_customer):
        self.user.stripe_customer_id = "cus_1"
        mock_customer.return_value = {"invoice_settings": {"default_payment_method": "pm_1"}}
        mock_list.return_value = {"data": [{"id": "pm_1", "card": {"brand": "visa", "last4": "4242"}}]}
        methods = StripeService.list_payment_methods(self.user)
        self.assertEqual(methods[0]["is_default"], True)
        self.assertEqual(methods, mock_list.return_value["data"])
        mock_list.assert_called_once()

    @patch("apps.payments.stripe_service.stripe.PaymentMethod.attach")
    def test_attach_payment_method(self, mock_attach):
        self.user.stripe_customer_id = "cus_1"
        StripeService.attach_payment_method(self.user, "pm_1")
        mock_attach.assert_called_once()

    @patch("apps.payments.stripe_service.stripe.PaymentMethod.detach")
    def test_detach_payment_method(self, mock_detach):
        StripeService.detach_payment_method(self.user, "pm_1")
        mock_detach.assert_called_once_with("pm_1")

    @patch("apps.payments.stripe_service.stripe.Customer.modify")
    def test_set_default_payment_method(self, mock_modify):
        self.user.stripe_customer_id = "cus_1"
        StripeService.set_default_payment_method(self.user, "pm_1")
        mock_modify.assert_called_once()

    @patch("apps.payments.stripe_service.logger")
    @patch("apps.payments.stripe_service.stripe.Subscription.retrieve")
    @patch("apps.payments.stripe_service.StripeService.cancel_subscription")
    def test_handle_successful_payment_logs_cancel_error(
        self, mock_cancel, mock_retrieve, mock_logger
    ):
        self.user.stripe_subscription_id = "sub_old"
        self.user.save()
        mock_cancel.side_effect = Exception("boom")
        mock_retrieve.return_value = {
            "id": "sub_new",
            "items": {"data": [{"id": "item_1"}]},
            "current_period_end": 123456,
        }
        session = {
            "metadata": {"user_id": self.user.id, "plan": "basic"},
            "subscription": "sub_new",
        }

        user = StripeService.handle_successful_payment(session)

        self.assertEqual(user.subscription_plan, "basic")
        mock_logger.error.assert_called_once()
