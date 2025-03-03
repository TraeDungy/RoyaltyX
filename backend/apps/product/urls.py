from django.urls import path

from .views import ProductListCreateAPIView, product_detail, product_user_list_create

urlpatterns = [
    path("", ProductListCreateAPIView.as_view(), name="product_list_create"),
    path("<int:product_id>/", product_detail, name="product_detail"),

    path("<int:product_id>/users", product_user_list_create, 
         name="product_user_list_create"),
]
