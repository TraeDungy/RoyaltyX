from rest_framework import serializers


class ShopifyOAuthCodeSerializer(serializers.Serializer):
    shop = serializers.CharField(required=True)
    code = serializers.CharField(required=True)
