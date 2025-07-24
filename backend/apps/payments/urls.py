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
    path(
        "billing-portal-session/",
        views.billing_portal_session,
        name="payments.billing_portal_session",
    ),
    path("invoices/", views.invoice_history, name="payments.invoice_history"),
]
