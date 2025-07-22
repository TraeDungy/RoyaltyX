import requests
from django.conf import settings
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import SquareOAuthCodeSerializer


class SquareTokenExchange(APIView):
    """Exchange authorization code for Square OAuth tokens."""

    @extend_schema(request=SquareOAuthCodeSerializer)
    def post(self, request):
        serializer = SquareOAuthCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        code = serializer.validated_data.get("code")
        token_url = "https://connect.squareup.com/oauth2/token"
        data = {
            "client_id": settings.SQUARE_APPLICATION_ID,
            "client_secret": settings.SQUARE_CLIENT_SECRET,
            "code": code,
            "grant_type": "authorization_code",
            "redirect_uri": settings.SQUARE_REDIRECT_URI,
        }
        response = requests.post(token_url, json=data)
        print(f"Response from Square token exchange: {response}")
        print(f"Response from Square token exchange: {response.json()}")
        response.raise_for_status()
        token_data = response.json()
        return Response(token_data, status=status.HTTP_201_CREATED)
