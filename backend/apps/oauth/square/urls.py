from django.urls import path
from .views import SquareTokenExchange

urlpatterns = [
    path("exchange/", SquareTokenExchange.as_view(), name="square-oauth-exchange"),
]
