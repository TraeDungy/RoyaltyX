from django.urls import path

from . import views
from .test_webhook import test_webhook

urlpatterns = [
    path(
        "create-checkout-session/",
        views.create_checkout_session,
        name="payments.create_checkout_session",
    ),
    path(
        "cancel-subscription/",
        views.cancel_subscription,
        name="payments.cancel_subscription",
    ),
    path(
        "subscription-status/",
        views.subscription_status,
        name="payments.subscription_status",
    ),
    path("verify-session/", views.verify_session, name="payments.verify_session"),
    path("stripe-webhook/", views.stripe_webhook, name="payments.stripe_webhook"),
    path("test-webhook/", test_webhook, name="payments.test_webhook"),
]
