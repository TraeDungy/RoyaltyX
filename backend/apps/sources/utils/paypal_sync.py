from datetime import date
from decimal import Decimal

from django.utils import timezone

from apps.product.models import Product, ProductSale
from apps.sources.models import Source

from .paypal_service import PayPalService


def fetch_paypal_transactions(source_id=None):
    sources = Source.objects.filter(platform=Source.PLATFORM_PAYPAL)
    if source_id:
        sources = sources.filter(id=source_id)

    start_date = date.today().isoformat()
    end_date = date.today().isoformat()

    for source in sources:
        if source.token_expires_at and timezone.now() > source.token_expires_at:
            new_token = PayPalService.refresh_token(source.refresh_token)
            source.access_token = new_token
            source.save(update_fields=["_access_token"])

        if not source.access_token:
            msg = (
                f"No access token set for source {source.id}, "
                "skipping transaction fetch"
            )
            print(msg)
            continue

        service = PayPalService(source.access_token)
        try:
            transactions = service.fetch_transactions(start_date, end_date)
            for tx in transactions:
                item = tx.get("transaction_info", {})
                amount_info = item.get("transaction_amount", {})
                title = item.get("transaction_subject", "PayPal Transaction")
                product, _ = Product.objects.get_or_create(
                    title=title,
                    project=source.project,
                    defaults={"source": source},
                )
                ProductSale.objects.create(
                    product=product,
                    type=ProductSale.TYPE_PURCHASE,
                    unit_price=Decimal(amount_info.get("value", 0)),
                    unit_price_currency=amount_info.get("currency_code", "USD"),
                    quantity=1,
                    royalty_amount=Decimal(amount_info.get("value", 0)),
                    royalty_currency=amount_info.get("currency_code", "USD"),
                    period_start=start_date,
                    period_end=end_date,
                )
            source.last_fetched_at = timezone.now()
            source.save(update_fields=["last_fetched_at"])
        except Exception as e:
            print(f"Failed to fetch PayPal transactions for source {source.id}: {e}")
