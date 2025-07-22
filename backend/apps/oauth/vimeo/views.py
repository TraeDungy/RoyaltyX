import requests
import logging
from django.conf import settings
from apps.oauth.vimeo.serializers import VimeoOAuthCodeSerializer
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


logger = logging.getLogger(__name__)


class VimeoTokenExchange(APIView):
    """Exchange authorization code for access token from Vimeo"""

    @extend_schema(request=VimeoOAuthCodeSerializer)
    def post(self, request):
        serializer = VimeoOAuthCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        code = serializer.validated_data.get("code")
        token_url = "https://api.vimeo.com/oauth/access_token"
        data = {
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": settings.VIMEO_REDIRECT_URI,
        }
        auth = (settings.VIMEO_CLIENT_ID, settings.VIMEO_CLIENT_SECRET)

        response = requests.post(token_url, data=data, auth=auth)
        logger.debug("Response from Vimeo token exchange: %s", response)
        if response.status_code != 200:
            response.raise_for_status()
        token_data = response.json()
        return Response(token_data, status=status.HTTP_201_CREATED)
