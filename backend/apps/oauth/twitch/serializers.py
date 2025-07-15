from rest_framework import serializers


class TwitchOAuthCodeSerializer(serializers.Serializer):
    code = serializers.CharField(required=True)
