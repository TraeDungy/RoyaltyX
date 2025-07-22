from django.utils import timezone

from apps.sources.models import Source
from apps.product.models import Product, ProductSale

from .shopify_service import ShopifyService


def fetch_shopify_orders(source_id=None):
    sources = Source.objects.filter(platform=Source.PLATFORM_SHOPIFY)
    if source_id:
        sources = sources.filter(id=source_id)

    for source in sources:
        if not source.access_token or not source.channel_id:
            print(f"Missing credentials for source {source.id}")
            continue

        service = ShopifyService(source.channel_id, source.access_token)
        try:
            orders = service.fetch_orders()
        except Exception as e:
            print(f"Failed to fetch Shopify orders: {e}")
            continue

        for order in orders:
            currency = order.get("currency") or "USD"
            created = order.get("created_at", "")[:10]
            for line in order.get("line_items", []):
                product, _ = Product.objects.get_or_create(
                    external_id=line.get("product_id"),
                    defaults={
                        "title": line.get("title"),
                        "project": source.project,
                        "source": source,
                    },
                )
                ProductSale.objects.create(
                    product=product,
                    type=ProductSale.TYPE_PURCHASE,
                    unit_price=line.get("price", 0),
                    unit_price_currency=currency,
                    quantity=line.get("quantity", 1),
                    is_refund=False,
                    royalty_amount=line.get("price", 0),
                    royalty_currency=currency,
                    period_start=created,
                    period_end=created,
                )
        source.last_fetched_at = timezone.now()
        source.save(update_fields=["last_fetched_at"])


def fetch_shopify_stats(source_id=None):
    """Placeholder for future detailed analytics."""
    fetch_shopify_orders(source_id)
