from django.urls import path

from .views import (
    ShopifyTokenExchange,
)

urlpatterns = [
    path(
        "exchange/",
        ShopifyTokenExchange.as_view(),
    ),
]
