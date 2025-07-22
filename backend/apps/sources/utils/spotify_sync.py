from datetime import date, timedelta
from django.utils import timezone

from apps.sources.models import Source
from apps.product.models import Product, ProductImpressions
from apps.sources.utils.spotify_service import SpotifyService


def fetch_spotify_tracks(source_id=None):
    sources = Source.objects.filter(platform=Source.PLATFORM_SPOTIFY)
    if source_id:
        sources = sources.filter(id=source_id)

    for source in sources:
        if source.token_expires_at and timezone.now() > source.token_expires_at:
            new_token = SpotifyService.refresh_token(source.refresh_token)
            source.access_token = new_token
            source.save(update_fields=["_access_token"])

        if not source.access_token:
            print(f"No access token set for source {source.id}, skipping tracks fetch")
            continue

        service = SpotifyService(access_token=source.access_token)

        try:
            items = service.fetch_tracks()
            for item in items:
                track = item.get("track", {})
                existing_product = Product.objects.filter(
                    external_id=track.get("id"),
                    project=source.project,
                ).first()
                if not existing_product:
                    images = track.get("album", {}).get("images", [])
                    thumbnail = images[0]["url"] if images else None
                    Product.objects.create(
                        external_id=track.get("id"),
                        title=track.get("name"),
                        description=None,
                        thumbnail=thumbnail,
                        project=source.project,
                        source=source,
                    )
            source.last_fetched_at = timezone.now()
            source.save(update_fields=["last_fetched_at"])
        except Exception as e:
            print(f"Failed to fetch tracks for source {source.id}: {e}")


def fetch_spotify_stats(source_id=None):
    sources = Source.objects.filter(platform=Source.PLATFORM_SPOTIFY)
    if source_id:
        sources = sources.filter(id=source_id)

    start_date = date.today().isoformat()
    end_date = date.today().isoformat()

    for source in sources:
        if source.token_expires_at and timezone.now() > source.token_expires_at:
            new_token = SpotifyService.refresh_token(source.refresh_token)
            source.access_token = new_token
            source.save(update_fields=["_access_token"])

        if not source.access_token:
            print(f"No access token set for source {source.id}, skipping stats fetch")
            continue

        service = SpotifyService(access_token=source.access_token)
        products = Product.objects.filter(source=source)

        for product in products:
            try:
                stats = service.fetch_track_stats(product.external_id)
                current_popularity = stats.get("popularity", 0)

                yesterday = date.today() - timedelta(days=1)
                yesterday_impressions = ProductImpressions.objects.filter(
                    product=product,
                    period_start=yesterday.isoformat(),
                    period_end=yesterday.isoformat(),
                ).first()

                yesterday_popularity = (
                    yesterday_impressions.impressions if yesterday_impressions else 0
                )

                views = max(0, current_popularity - yesterday_popularity)

                existing_stats = ProductImpressions.objects.filter(
                    product=product,
                    period_start=start_date,
                    period_end=end_date,
                ).exists()

                if not existing_stats:
                    ProductImpressions.objects.create(
                        product=product,
                        impressions=views,
                        ecpm=0,
                        period_start=start_date,
                        period_end=end_date,
                    )
            except Exception as e:
                print(f"Failed to fetch stats for product {product.id}: {e}")
