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
