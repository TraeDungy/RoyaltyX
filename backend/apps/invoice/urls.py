from django.urls import path

from .views import InvoiceListCreateView, InvoiceRuleListCreateView

urlpatterns = [
    path("", InvoiceListCreateView.as_view(), name="invoice-list-create"),
    path(
        "rules/",
        InvoiceRuleListCreateView.as_view(),
        name="invoice-rule-list-create",
    ),
]
