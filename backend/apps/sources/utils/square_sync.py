from datetime import date
from django.utils import timezone
from django.db import models

from apps.sources.models import Source
from apps.product.models import Product, ProductSale, ProductImpressions

from .square_service import SquareService


def fetch_square_sales(source_id=None):
    sources = Source.objects.filter(platform=Source.PLATFORM_SQUARE)
    if source_id:
        sources = sources.filter(id=source_id)

    for source in sources:
        if source.token_expires_at and timezone.now() > source.token_expires_at:
            new_token = SquareService.refresh_token(source.refresh_token)
            source.access_token = new_token
            source.save(update_fields=["_access_token"])

        if not source.access_token:
            print(f"No access token set for source {source.id}, skipping sales fetch")
            continue

        service = SquareService(access_token=source.access_token)
        try:
            payments = service.fetch_payments()
            for payment in payments:
                payment_date = payment.get("created_at", "")[:10]
                for item in payment.get("order", {}).get("line_items", []):
                    product, _ = Product.objects.get_or_create(
                        external_id=item.get("catalog_object_id"),
                        project=source.project,
                        source=source,
                        defaults={"title": item.get("name", "Square Item")},
                    )
                    ProductSale.objects.get_or_create(
                        product=product,
                        type=ProductSale.TYPE_PURCHASE,
                        unit_price=float(item.get("base_price_money", {}).get("amount", 0)) / 100,
                        unit_price_currency=item.get("base_price_money", {}).get("currency", "USD"),
                        quantity=int(item.get("quantity", 1)),
                        royalty_amount=float(item.get("base_price_money", {}).get("amount", 0)) / 100,
                        royalty_currency=item.get("base_price_money", {}).get("currency", "USD"),
                        period_start=payment_date,
                        period_end=payment_date,
                    )
            source.last_fetched_at = timezone.now()
            source.save(update_fields=["last_fetched_at"])
        except Exception as e:
            print(f"Failed to fetch sales for source {source.id}: {e}")


def fetch_square_stats(source_id=None):
    sources = Source.objects.filter(platform=Source.PLATFORM_SQUARE)
    if source_id:
        sources = sources.filter(id=source_id)

    start_date = date.today().isoformat()
    end_date = date.today().isoformat()

    for source in sources:
        if not source.access_token:
            continue

        products = Product.objects.filter(source=source)
        for product in products:
            day_sales = ProductSale.objects.filter(
                product=product,
                period_start=start_date,
                period_end=end_date,
            ).aggregate(total_amount=models.Sum("royalty_amount"))["total_amount"] or 0

            exists = ProductImpressions.objects.filter(
                product=product,
                period_start=start_date,
                period_end=end_date,
            ).exists()

            if not exists:
                ProductImpressions.objects.create(
                    product=product,
                    impressions=int(day_sales),
                    ecpm=0,
                    period_start=start_date,
                    period_end=end_date,
                )
