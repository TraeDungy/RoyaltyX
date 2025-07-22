from django.urls import path

from .views import SpotifyTokenExchange

urlpatterns = [
    path("exchange/", SpotifyTokenExchange.as_view()),
]
