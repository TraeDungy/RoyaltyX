from django.urls import path

from .views import (
    GoogleTokenExchange,
)

urlpatterns = [
    path(
        "exchange/",
        GoogleTokenExchange.as_view(),
    ),
]
