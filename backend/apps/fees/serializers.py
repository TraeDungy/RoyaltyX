from rest_framework import serializers

from .models import FeeType, FeeGroup, FeeRule, FeeAdjustment


class FeeTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeeType
        fields = "__all__"


class FeeGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeeGroup
        fields = "__all__"


class FeeRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeeRule
        fields = "__all__"


class FeeAdjustmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeeAdjustment
        fields = "__all__"
