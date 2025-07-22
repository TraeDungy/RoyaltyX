from datetime import date, timedelta
from django.utils import timezone
from apps.sources.models import Source
from apps.product.models import Product, ProductImpressions
from apps.sources.utils.vimeo_service import VimeoService


def fetch_vimeo_videos(source_id=None):
    sources = Source.objects.filter(platform=Source.PLATFORM_VIMEO)
    if source_id:
        sources = sources.filter(id=source_id)

    for source in sources:
        if source.token_expires_at and timezone.now() > source.token_expires_at:
            new_token = VimeoService.refresh_token(source.refresh_token)
            source.access_token = new_token
            source.save(update_fields=["_access_token"])

        if not source.access_token:
            print(f"No access token set for source {source.id}, skipping videos fetch")
            continue

        service = VimeoService(access_token=source.access_token)
        try:
            videos = service.fetch_videos()
            for video in videos:
                existing_product = Product.objects.filter(
                    external_id=video.get("uri"),
                    project=source.project,
                ).first()

                if not existing_product:
                    thumbnail = None
                    pics = video.get("pictures", {})
                    sizes = pics.get("sizes", [])
                    if sizes:
                        thumbnail = sizes[-1].get("link")
                    Product.objects.create(
                        external_id=video.get("uri"),
                        title=video.get("name"),
                        description=video.get("description"),
                        thumbnail=thumbnail,
                        project=source.project,
                        source=source,
                    )
            source.last_fetched_at = timezone.now()
            source.save(update_fields=["last_fetched_at"])
        except Exception as e:
            print(f"Failed to fetch videos for source {source.id}: {e}")


def fetch_vimeo_stats(source_id=None):
    sources = Source.objects.filter(platform=Source.PLATFORM_VIMEO)
    if source_id:
        sources = sources.filter(id=source_id)

    start_date = date.today().isoformat()
    end_date = date.today().isoformat()

    for source in sources:
        if source.token_expires_at and timezone.now() > source.token_expires_at:
            new_token = VimeoService.refresh_token(source.refresh_token)
            source.access_token = new_token
            source.save(update_fields=["_access_token"])

        if not source.access_token:
            print(f"No access token set for source {source.id}, skipping stats fetch")
            continue

        service = VimeoService(access_token=source.access_token)
        products = Product.objects.filter(source=source)
        for product in products:
            try:
                stats = service.fetch_video_stats(product.external_id.split('/')[-1])
                current_view_count = stats.get("plays", 0)

                yesterday = date.today() - timedelta(days=1)
                yesterday_impressions = ProductImpressions.objects.filter(
                    product=product,
                    period_start=yesterday.isoformat(),
                    period_end=yesterday.isoformat(),
                ).first()
                yesterday_views = yesterday_impressions.impressions if yesterday_impressions else 0
                views = max(0, current_view_count - yesterday_views)

                existing_stats = ProductImpressions.objects.filter(
                    product=product, period_start=start_date, period_end=end_date
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
