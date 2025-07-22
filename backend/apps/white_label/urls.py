from django.urls import path

from . import views

urlpatterns = [
    path("config/", views.config, name="white_label_config"),
    path("cost-estimate/", views.cost_estimate, name="white_label_cost_estimate"),
]
