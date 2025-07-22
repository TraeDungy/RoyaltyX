from django.urls import path
from .views import white_label_config_view

urlpatterns = [
    path("config/", white_label_config_view, name="white_label_config"),
]
