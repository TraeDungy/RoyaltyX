from django.urls import path

from . import views

urlpatterns = [
    path("add-ons/", views.AddOnListView.as_view(), name="payments.add_on_list"),
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
        "update-subscription/",
        views.update_subscription,
        name="payments.update_subscription",
    ),
    path(
        "subscription-status/",
        views.subscription_status,
        name="payments.subscription_status",
    ),
    path("verify-session/", views.verify_session, name="payments.verify_session"),
    path("stripe-webhook/", views.stripe_webhook, name="payments.stripe_webhook"),
    path("billing-history/", views.billing_history, name="payments.billing_history"),
    path(
        "payment-methods/",
        views.payment_methods,
        name="payments.payment_methods",
    ),
    path(
        "payment-methods/add/",
        views.add_payment_method,
        name="payments.add_payment_method",
    ),
    path(
        "payment-methods/remove/",
        views.remove_payment_method,
        name="payments.remove_payment_method",
    ),
    path(
        "payment-methods/default/",
        views.set_default_payment_method,
        name="payments.set_default_payment_method",
    ),
]
