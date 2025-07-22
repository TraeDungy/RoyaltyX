from django.urls import path

from .views import StockListCreateView, StockPriceListView

urlpatterns = [
    path("", StockListCreateView.as_view(), name="stocks"),
    path("<int:stock_id>/prices/", StockPriceListView.as_view(), name="stock-prices"),
]
