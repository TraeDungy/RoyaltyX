from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        depth = 1


class UserLiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "name"]


class SubscriptionPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["subscription_plan"]


class UserUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating basic user fields."""

    class Meta:
        model = User
        fields = ["name", "avatar"]
