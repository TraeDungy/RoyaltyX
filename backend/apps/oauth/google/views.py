import requests
from django.conf import settings
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import GoogleOAuthCodeSerializer


class GoogleTokenExchange(APIView):
    """
    POST: Get access and refresh token from Google OAuth2 by providing
    an authorization code.
    """

    @extend_schema(
        request=GoogleOAuthCodeSerializer,
    )
    def post(self, request):
        serializer = GoogleOAuthCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        code = serializer.validated_data["code"]

        token_url = "https://oauth2.googleapis.com/token"
        data = {
            "code": code,
            "client_id": settings.GOOGLE_CLIENT_ID,
            "client_secret": settings.GOOGLE_CLIENT_SECRET,
            "redirect_uri": settings.GOOGLE_REDIRECT_URI,
            "grant_type": "authorization_code",
        }

        response = requests.post(
            token_url,
            data=data,
            headers={"Content-Type": "application/x-www-form-urlencoded"},
        )

        print(f"Response from Google token exchange: {response}")
        print(f"Response from Google token exchange: {response.json()}")

        response.raise_for_status()

        token_data = response.json()

        return Response(token_data, status=status.HTTP_201_CREATED)
