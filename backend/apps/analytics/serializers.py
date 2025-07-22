from rest_framework import serializers


class AnalyticsSerializer(serializers.Serializer):
    period_start = serializers.DateField(required=False)
    period_end = serializers.DateField(required=False)


class AnalyticsForecastSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    forecast = serializers.CharField()
