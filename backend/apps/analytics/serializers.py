from rest_framework import serializers

from apps.analytics.models import AnalyticsForecast, DashboardPreference


class AnalyticsSerializer(serializers.Serializer):
    period_start = serializers.DateField(required=False)
    period_end = serializers.DateField(required=False)


class ReportingSerializer(AnalyticsSerializer):
    """Serializer for analytics reporting with dimensions."""

    dimension = serializers.ChoiceField(
        choices=["source", "platform"], default="source", required=False
    )


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


class DashboardPreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = DashboardPreference
        fields = ["data"]
