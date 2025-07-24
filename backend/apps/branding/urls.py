from django.urls import path

from .views import page_customization_detail

urlpatterns = [
    path('page-customizations/<str:page_name>/', page_customization_detail),
]
