from rest_framework import serializers


class TikTokOAuthCodeSerializer(serializers.Serializer):
    code = serializers.CharField(required=True)
