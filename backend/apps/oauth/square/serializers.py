from rest_framework import serializers


class SquareOAuthCodeSerializer(serializers.Serializer):
    code = serializers.CharField(required=True)
