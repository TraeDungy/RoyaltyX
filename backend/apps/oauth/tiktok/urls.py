from django.urls import path

from .views import (
    TikTokTokenExchange,
)

urlpatterns = [
    path(
        "exchange/",
        TikTokTokenExchange.as_view(),
    ),
]
