from django.urls import path

from .views import product_detail, product_list_create

urlpatterns = [
    path('', product_list_create, name='product_list_create'),
    path('<int:product_id>/', product_detail, name='product_detail'),
]
