from django.urls import path
from .views import product_list_create, product_detail

urlpatterns = [
    path('', product_list_create, name='product_list_create'),  # GET (list), POST (create)
    path('<int:product_id>/', product_detail, name='product_detail'),  # GET (retrieve), PUT (update), DELETE (delete)
]
