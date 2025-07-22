from rest_framework import serializers

from .models import Stock, StockPrice


class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ["id", "symbol", "account_name", "last_fetched_at", "project"]
        read_only_fields = ["project", "last_fetched_at"]


class StockPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockPrice
        fields = ["date", "open", "high", "low", "close", "volume"]
