from rest_framework import serializers


class AnalyticsSerializer(serializers.Serializer):
    period_start = serializers.DateField(required=False)
    period_end = serializers.DateField(required=False)
    group_by = serializers.ChoiceField(
        choices=["source", "platform"], required=False
    )
