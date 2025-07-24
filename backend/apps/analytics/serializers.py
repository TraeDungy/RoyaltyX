from rest_framework import serializers

from apps.analytics.models import AnalyticsForecast


class AnalyticsSerializer(serializers.Serializer):
    period_start = serializers.DateField(required=False)
    period_end = serializers.DateField(required=False)
    granularity = serializers.ChoiceField(
        choices=["hourly", "daily", "monthly", "yearly"], required=False
    )


class ReportingSerializer(AnalyticsSerializer):
    """Serializer for analytics reporting with dimensions."""

    dimension = serializers.ChoiceField(
        choices=["source", "platform"], default="source", required=False
    )


class ComparisonSerializer(AnalyticsSerializer):
    """Serializer for comparing multiple products"""

    product_ids = serializers.CharField()
    granularity = serializers.ChoiceField(
        choices=["hourly", "daily", "monthly", "yearly"], required=False
    )

    def validate_product_ids(self, value):
        try:
            ids = [int(v) for v in value.split(",") if v]
        except ValueError as exc:  # pragma: no cover - invalid input
            raise serializers.ValidationError("Invalid product ids") from exc
        if not ids:
            raise serializers.ValidationError("No product ids provided")
        return ids


class AnalyticsForecastSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalyticsForecast
        fields = [
            "id",
            "project",
            "product",
            "period_start",
            "period_end",
            "forecast",
        ]
        read_only_fields = ["id", "project"]
