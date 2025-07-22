from rest_framework import serializers

from .models import AnalyticsForecast


class AnalyticsSerializer(serializers.Serializer):
    period_start = serializers.DateField(required=False)
    period_end = serializers.DateField(required=False)


class AnalyticsForecastSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalyticsForecast
        fields = [
            "id",
            "forecast",
            "created_at",
            "period_start",
            "period_end",
            "product",
        ]

