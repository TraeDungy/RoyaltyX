from django.urls import path

from .views import (
    TwitchTokenExchange,
)

urlpatterns = [
    path(
        "exchange/",
        TwitchTokenExchange.as_view(),
    ),
]
