from django.db import models

from apps.project.models import Project
from common.models import BaseModel


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
    access_token = models.CharField(max_length=255, blank=True, null=True)
    refresh_token = models.CharField(max_length=255, blank=True, null=True)
    token_expires_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = "source"
