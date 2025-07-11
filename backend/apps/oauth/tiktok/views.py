import requests
from django.conf import settings
from apps.oauth.tiktok.serializers import TikTokOAuthCodeSerializer
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView



class TikTokTokenExchange(APIView):
    """
    POST: Get access and refresh token from TikTok OAuth2 by providing
    an authorization code.
    """

    @extend_schema(
        request=TikTokOAuthCodeSerializer,
    )
    def post(self, request):
        serializer = TikTokOAuthCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        code = serializer.validated_data.get("code", None)

        token_url = "https://open.tiktokapis.com/v2/oauth/token/"
        data = {
            "code": code,
            "client_key": settings.TIKTOK_CLIENT_ID,
            "client_secret": settings.TIKTOK_CLIENT_SECRET,
            "redirect_uri": settings.TIKTOK_REDIRECT_URI,
            "grant_type": "authorization_code",
        }

        response = requests.post(
            token_url,
            data=data,
            headers={"Content-Type": "application/x-www-form-urlencoded"},
        )

        print(f"Response from TikTok token exchange: {response}")
        print(f"Response from TikTok token exchange: {response.json()}")

        response.raise_for_status()

        token_data = response.json()

        return Response(token_data, status=status.HTTP_201_CREATED)
