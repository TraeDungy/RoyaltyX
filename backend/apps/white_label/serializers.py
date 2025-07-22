from rest_framework import serializers
from .models import WhiteLabelConfig


class WhiteLabelConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhiteLabelConfig
        fields = "__all__"
