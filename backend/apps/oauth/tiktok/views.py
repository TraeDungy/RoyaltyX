import logging
import requests
from django.conf import settings
from apps.oauth.tiktok.serializers import TikTokOAuthCodeSerializer
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


logger = logging.getLogger(__name__)



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

        for attempt in range(3):
            try:
                response = requests.post(
                    token_url,
                    data=data,
                    headers={"Content-Type": "application/x-www-form-urlencoded"},
                )
                logger.info(
                    "Response from TikTok token exchange: %s", response
                )
                response.raise_for_status()
                break
            except requests.RequestException as e:
                logger.error(
                    "TikTok token exchange attempt %s failed: %s",
                    attempt + 1,
                    e,
                )
                if attempt == 2:
                    raise

        token_data = response.json()

        return Response(token_data, status=status.HTTP_201_CREATED)
