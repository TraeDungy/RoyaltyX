from django.db import models

from apps.project.models import Project
from common.models import BaseModel
from common.utils.cryptography import decrypt_token, encrypt_token


class Source(BaseModel):
    SOURCE_PLATFORM_YOUTUBE = "youtube"
    SOURCE_PLATFORM_GOOGLE_ADS = "google_ads"
    SOURCE_PLATFORM_FACEBOOK = "facebook"
    SOURCE_PLATFORM_AMAZON = "amazon"

    SOURCE_PLATFORMS = [
        (SOURCE_PLATFORM_YOUTUBE, "YouTube"),
        (SOURCE_PLATFORM_GOOGLE_ADS, "Google Ads"),
        (SOURCE_PLATFORM_FACEBOOK, "Facebook"),
        (SOURCE_PLATFORM_AMAZON, "Amazon"),
    ]

    platform = models.CharField(max_length=50, choices=SOURCE_PLATFORMS)
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="sources"
    )

    _access_token = models.TextField(
        max_length=255, blank=True, null=True, db_column="access_token"
    )
    _refresh_token = models.TextField(
        max_length=255, blank=True, null=True, db_column="refresh_token"
    )

    @property
    def access_token(self):
        return decrypt_token(self._access_token) if self._access_token else None

    @access_token.setter
    def access_token(self, value):
        self._access_token = encrypt_token(value) if value else None

    @property
    def refresh_token(self):
        return decrypt_token(self._refresh_token) if self._refresh_token else None

    @refresh_token.setter
    def refresh_token(self, value):
        self._refresh_token = encrypt_token(value) if value else None

    token_expires_at = models.DateTimeField(blank=True, null=True)
    last_fetched_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = "source"
