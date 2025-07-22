import requests
from django.conf import settings
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import SpotifyOAuthCodeSerializer


class SpotifyTokenExchange(APIView):
    """Exchange Spotify OAuth code for tokens."""

    @extend_schema(request=SpotifyOAuthCodeSerializer)
    def post(self, request):
        serializer = SpotifyOAuthCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        code = serializer.validated_data.get("code")

        token_url = "https://accounts.spotify.com/api/token"
        data = {
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": settings.SPOTIFY_REDIRECT_URI,
            "client_id": settings.SPOTIFY_CLIENT_ID,
            "client_secret": settings.SPOTIFY_CLIENT_SECRET,
        }

        response = requests.post(token_url, data=data)
        print(f"Response from Spotify token exchange: {response}")
        print(f"Response from Spotify token exchange: {response.json()}")
        response.raise_for_status()
        return Response(response.json(), status=status.HTTP_201_CREATED)
