from django.urls import path

from .views import product_detail, product_list_create, product_user_list_create

urlpatterns = [
    path("", product_list_create, name="product_list_create"),
    path("<int:product_id>/", product_detail, name="product_detail"),

    path("<int:product_id>/users", product_user_list_create, 
         name="product_user_list_create"),
]
