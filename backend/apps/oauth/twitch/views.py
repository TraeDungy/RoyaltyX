import requests
from django.conf import settings
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.oauth.twitch.serializers import TwitchOAuthCodeSerializer


class TwitchTokenExchange(APIView):
    """
    POST: Get access and refresh token from Twitch OAuth2 by providing
    an authorization code.
    """

    @extend_schema(
        request=TwitchOAuthCodeSerializer,
    )
    def post(self, request):
        serializer = TwitchOAuthCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        code = serializer.validated_data.get("code", None)

        token_url = "https://id.twitch.tv/oauth2/token"
        data = {
            "code": code,
            "client_id": settings.TWITCH_CLIENT_ID,
            "client_secret": settings.TWITCH_CLIENT_SECRET,
            "redirect_uri": settings.TWITCH_REDIRECT_URI,
            "grant_type": "authorization_code",
        }

        response = requests.post(
            token_url,
            data=data,
            headers={"Content-Type": "application/x-www-form-urlencoded"},
        )

        print(f"Response from Twitch token exchange: {response}")
        print(f"Response from Twitch token exchange: {response.json()}")

        response.raise_for_status()

        token_data = response.json()

        return Response(token_data, status=status.HTTP_201_CREATED)
