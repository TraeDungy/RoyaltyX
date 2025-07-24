import logging
import os
from datetime import datetime, timezone

import stripe
from django.contrib.auth import get_user_model

from .tasks import (
    send_payment_failed_email,
    send_subscription_canceled_email,
)

# Initialize Stripe
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

logger = logging.getLogger(__name__)


class StripeService:
    @staticmethod
    def create_customer(user):
        """Create a Stripe customer for the user"""
        try:
            customer = stripe.Customer.create(
                email=user.email,
                name=user.name,
                metadata={"user_id": user.id, "username": user.username},
            )
            user.stripe_customer_id = customer.id
            user.save()
            return customer
        except stripe.error.StripeError as e:
            raise Exception(f"Failed to create Stripe customer: {str(e)}")

    @staticmethod
    def get_or_create_customer(user):
        """Get existing customer or create new one"""
        if user.stripe_customer_id:
            try:
                return stripe.Customer.retrieve(user.stripe_customer_id)
            except stripe.error.StripeError:
                # Customer doesn't exist, create new one
                pass

        return StripeService.create_customer(user)

    @staticmethod
    def create_checkout_session(user, plan, addons=None):
        """Create a Stripe checkout session for subscription and optional add-ons"""
        try:
            customer = StripeService.get_or_create_customer(user)

            # Get price ID based on plan
            price_id = StripeService.get_price_id_for_plan(plan)
            if not price_id:
                raise Exception(f"No price ID configured for plan: {plan}")

            line_items = [
                {
                    "price": price_id,
                    "quantity": 1,
                }
            ]

            if addons:
                for addon in addons:
                    line_items.append({"price": addon.stripe_price_id, "quantity": 1})

            session = stripe.checkout.Session.create(
                customer=customer.id,
                payment_method_types=["card"],
                line_items=line_items,
                mode="subscription",
                success_url=f"{os.getenv('REACT_APP_URL')}/account/membership?session_id={{CHECKOUT_SESSION_ID}}&status=success",
                cancel_url=f"{os.getenv('REACT_APP_URL')}/account/membership?status=cancelled",
                metadata={"user_id": user.id, "plan": plan},
            )
            return session
        except stripe.error.StripeError as e:
            raise Exception(f"Failed to create checkout session: {str(e)}")

    @staticmethod
    def get_price_id_for_plan(plan):
        """Get Stripe price ID for subscription plan"""
        price_mapping = {
            "basic": os.getenv("STRIPE_BASIC_PRICE_ID"),
            "premium": os.getenv("STRIPE_PREMIUM_PRICE_ID"),
        }
        return price_mapping.get(plan)

    @staticmethod
    def cancel_subscription(subscription_id):
        """Cancel a Stripe subscription"""
        try:
            return stripe.Subscription.delete(subscription_id)
        except stripe.error.StripeError as e:
            raise Exception(f"Failed to cancel subscription: {str(e)}")

    @staticmethod
    def update_subscription(user, plan=None, add_ons=None):
        """Update an existing Stripe subscription with proration."""
        if not user.stripe_subscription_id:
            raise Exception("User has no active subscription")

        try:
            subscription = stripe.Subscription.retrieve(
                user.stripe_subscription_id,
            )
            item_id = (
                user.stripe_subscription_item_id
                or subscription["items"]["data"][0]["id"]
            )

            items = []

            if plan:
                price_id = StripeService.get_price_id_for_plan(plan)
                if not price_id:
                    raise Exception(f"No price ID configured for plan: {plan}")
                items.append({"id": item_id, "price": price_id})
            else:
                items.append(
                    {
                        "id": item_id,
                        "price": subscription["items"]["data"][0]["price"]["id"],
                    },
                )

            if add_ons is not None:
                for addon in add_ons:
                    items.append({"price": addon.stripe_price_id, "quantity": 1})

            subscription = stripe.Subscription.modify(
                user.stripe_subscription_id,
                cancel_at_period_end=False,
                proration_behavior="create_prorations",
                items=items,
            )

            if plan:
                user.subscription_plan = plan
            user.subscription_current_period_end = datetime.fromtimestamp(
                subscription["current_period_end"], tz=timezone.utc
            )
            user.subscription_status = subscription["status"]
            user.stripe_subscription_item_id = subscription["items"]["data"][0]["id"]
            if add_ons is not None:
                user.add_ons.set(add_ons)
            user.save()
            return subscription
        except stripe.error.StripeError as e:
            raise Exception(f"Failed to update subscription: {str(e)}")

    @staticmethod
    def handle_successful_payment(session):
        """Handle successful payment from webhook"""
        try:
            User = get_user_model()
            user_id = session["metadata"]["user_id"]
            plan = session["metadata"]["plan"]

            user = User.objects.get(id=user_id)

            # Get the subscription from the session
            subscription = stripe.Subscription.retrieve(session["subscription"])
            item_id = subscription["items"]["data"][0]["id"]

            # Cancel existing subscription if any
            if user.stripe_subscription_id:
                try:
                    StripeService.cancel_subscription(user.stripe_subscription_id)
                except Exception as e:  # pragma: no cover - log and continue
                    logger.error(
                        "Failed to cancel existing subscription %s for user %s: %s",
                        user.stripe_subscription_id,
                        user.id,
                        str(e),
                    )

            # Update user with new subscription details
            user.subscription_plan = plan
            user.stripe_subscription_id = subscription["id"]
            user.subscription_status = "active"
            user.subscription_current_period_end = datetime.fromtimestamp(
                subscription["current_period_end"], tz=timezone.utc
            )
            user.stripe_subscription_item_id = item_id
            user.payment_failure_count = 0
            user.grace_period_end = None
            user.save()

            return user
        except Exception as e:
            raise Exception(f"Failed to handle successful payment: {str(e)}")

    @staticmethod
    def handle_payment_failed(invoice):
        """Handle failed payment from webhook"""
        try:
            User = get_user_model()
            subscription_id = invoice["subscription"]
            user = User.objects.get(stripe_subscription_id=subscription_id)

            user.subscription_status = "past_due"
            user.payment_failure_count += 1
            user.save()

            send_payment_failed_email.delay(user.id)

            return user
        except User.DoesNotExist:
            raise Exception(f"User not found for subscription: {subscription_id}")

    @staticmethod
    def handle_subscription_deleted(subscription):
        """Handle subscription deletion from webhook"""
        try:
            User = get_user_model()
            user = User.objects.get(stripe_subscription_id=subscription["id"])

            # Downgrade to free plan
            user.subscription_plan = "free"
            user.subscription_status = "canceled"
            user.stripe_subscription_id = None
            user.subscription_current_period_end = None
            user.grace_period_end = None
            user.save()

            send_subscription_canceled_email.delay(user.id)

            return user
        except User.DoesNotExist:
            raise Exception(f"User not found for subscription: {subscription['id']}")

    @staticmethod
    def list_invoices(user):
        """Return a list of invoices for the user's customer."""
        if not user.stripe_customer_id:
            return []
        try:
            invoices = stripe.Invoice.list(customer=user.stripe_customer_id)
            return invoices.get("data", [])
        except stripe.error.StripeError as e:
            raise Exception(f"Failed to list invoices: {str(e)}")

    @staticmethod
    def list_payment_methods(user):
        """List payment methods attached to the customer."""
        if not user.stripe_customer_id:
            return []
        try:
            customer = stripe.Customer.retrieve(user.stripe_customer_id)
            default_pm = customer.get("invoice_settings", {}).get(
                "default_payment_method",
            )
            methods = stripe.PaymentMethod.list(
                customer=user.stripe_customer_id, type="card"
            )
            data = methods.get("data", [])
            for m in data:
                m["is_default"] = m.get("id") == default_pm
            return data
        except stripe.error.StripeError as e:
            raise Exception(f"Failed to list payment methods: {str(e)}")

    @staticmethod
    def attach_payment_method(user, payment_method_id):
        """Attach a payment method to the customer."""
        if not user.stripe_customer_id:
            StripeService.create_customer(user)
        try:
            stripe.PaymentMethod.attach(
                payment_method_id, customer=user.stripe_customer_id
            )
        except stripe.error.StripeError as e:
            raise Exception(f"Failed to add payment method: {str(e)}")

    @staticmethod
    def detach_payment_method(user, payment_method_id):
        """Detach a payment method from the customer."""
        try:
            stripe.PaymentMethod.detach(payment_method_id)
        except stripe.error.StripeError as e:
            raise Exception(f"Failed to remove payment method: {str(e)}")

    @staticmethod
    def set_default_payment_method(user, payment_method_id):
        """Set the default payment method for the customer."""
        if not user.stripe_customer_id:
            StripeService.create_customer(user)
        try:
            stripe.Customer.modify(
                user.stripe_customer_id,
                invoice_settings={"default_payment_method": payment_method_id},
            )
        except stripe.error.StripeError as e:
            raise Exception(f"Failed to update default payment method: {str(e)}")
