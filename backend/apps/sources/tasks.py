from celery import shared_task
from django.utils import timezone

from apps.product.models import Product

from .models import Source
from .utils.youtube import (
    refresh_access_token,
    request_users_youtube_content,
)


@shared_task
def fetch_youtube_stats():
    sources = Source.objects.filter(platform=Source.PLATFORM_YOUTUBE)

    for source in sources:
        if source.token_expires_at and timezone.now() > source.token_expires_at:
            new_token = refresh_access_token(source.refresh_token)
            source.access_token = new_token
            source.save(update_fields=["_access_token"])

        youtube_videos = request_users_youtube_content(access_token=source.access_token)
        for video in youtube_videos.get("items", []):
            existing_product = Product.objects.filter(
                title=video["snippet"]["title"],
                project=source.project,
            ).first()
            if not existing_product:
                Product.objects.create(
                    title=video["snippet"]["title"],
                    description=video["snippet"]["description"],
                    thumbnail=video["snippet"]["thumbnails"]
                    .get("high", {})
                    .get("url", video["snippet"]["thumbnails"]["default"]["url"]),
                    project=source.project,
                )
        source.last_fetched_at = timezone.now()
        source.save(update_fields=["last_fetched_at"])

    print("Fetching YouTube stats...", flush=True)
