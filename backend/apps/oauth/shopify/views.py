import requests
from django.conf import settings
from apps.oauth.shopify.serializers import ShopifyOAuthCodeSerializer
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView



class ShopifyTokenExchange(APIView):
    """
    POST: Exchange an OAuth code for a Shopify access token.
    """

    @extend_schema(
        request=ShopifyOAuthCodeSerializer,
    )
    def post(self, request):
        serializer = ShopifyOAuthCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        code = serializer.validated_data.get("code")
        shop = serializer.validated_data.get("shop")

        token_url = f"https://{shop}/admin/oauth/access_token"
        data = {
            "code": code,
            "client_id": settings.SHOPIFY_API_KEY,
            "client_secret": settings.SHOPIFY_API_SECRET,
        }

        response = requests.post(
            token_url,
            data=data,
            headers={"Content-Type": "application/x-www-form-urlencoded"},
        )

        print(f"Response from Shopify token exchange: {response}")
        print(f"Response from Shopify token exchange: {response.json()}")

        response.raise_for_status()

        token_data = response.json()

        return Response(token_data, status=status.HTTP_201_CREATED)
