from rest_framework import serializers


class SpotifyOAuthCodeSerializer(serializers.Serializer):
    code = serializers.CharField(required=True)
