from rest_framework import serializers

from .models import Permission, Role, User


class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ["code", "description"]


class RoleSerializer(serializers.ModelSerializer):
    permissions = PermissionSerializer(many=True)

    class Meta:
        model = Role
        fields = ["name", "description", "permissions"]


class UserSerializer(serializers.ModelSerializer):
    roles = RoleSerializer(many=True, read_only=True)
    permissions = PermissionSerializer(many=True, read_only=True)

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
