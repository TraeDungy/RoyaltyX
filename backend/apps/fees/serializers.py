from rest_framework import serializers

from .models import AppliedFee, FeeRule, FeeType


class FeeTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeeType
        fields = "__all__"


class FeeRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeeRule
        fields = "__all__"


class AppliedFeeSerializer(serializers.ModelSerializer):
    fee_type = FeeTypeSerializer(read_only=True)

    class Meta:
        model = AppliedFee
        fields = ["id", "sale", "fee_type", "amount", "created_at"]
        read_only_fields = ["id", "created_at"]
