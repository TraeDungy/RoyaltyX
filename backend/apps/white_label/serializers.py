from rest_framework import serializers

from .models import WhiteLabelConfig


class WhiteLabelConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhiteLabelConfig
        fields = [
            "brand_name",
            "domain",
            "logo_url",
            "primary_color",
            "seat_cost",
        ]
