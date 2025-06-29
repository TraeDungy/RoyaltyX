from rest_framework import serializers


class GoogleOAuthCodeSerializer(serializers.Serializer):
    code = serializers.CharField(required=True)
