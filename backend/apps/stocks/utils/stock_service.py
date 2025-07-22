import requests
from django.conf import settings
from django.utils import timezone

from ..models import Stock, StockPrice


class StockService:
    BASE_URL = "https://www.alphavantage.co/query"

    @staticmethod
    def fetch_daily(symbol: str) -> dict:
        params = {
            "function": "TIME_SERIES_DAILY_ADJUSTED",
            "symbol": symbol,
            "apikey": settings.STOCK_API_KEY,
            "outputsize": "compact",
        }
        response = requests.get(StockService.BASE_URL, params=params)
        response.raise_for_status()
        return response.json().get("Time Series (Daily)", {})


def update_all_stock_prices(stock_id=None):
    stocks = Stock.objects.all()
    if stock_id:
        stocks = stocks.filter(id=stock_id)

    for stock in stocks:
        data = StockService.fetch_daily(stock.symbol)
        for date_str, values in data.items():
            StockPrice.objects.update_or_create(
                stock=stock,
                date=date_str,
                defaults={
                    "open": values.get("1. open"),
                    "high": values.get("2. high"),
                    "low": values.get("3. low"),
                    "close": values.get("4. close"),
                    "volume": values.get("6. volume"),
                },
            )
        stock.last_fetched_at = timezone.now()
        stock.save(update_fields=["last_fetched_at"])
