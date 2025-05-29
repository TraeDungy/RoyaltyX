from datetime import datetime, timedelta

from django.db.models import ExpressionWrapper, F, FloatField, Sum
from django.db.models.functions import TruncMonth

from apps.product.models import ProductImpressions, ProductSale


def calculateProductAnalytics(product_id: int, filters: dict):
    now = datetime.now()
    impressions_qs = ProductImpressions.objects.filter(product_id=product_id)
    if filters:
        impressions_qs = impressions_qs.filter(**filters)

    # Monthly impressions and impression revenue
    monthly_impressions = (
        impressions_qs.annotate(month=TruncMonth("created_at"))
        .values("month")
        .annotate(impressions=Sum("impressions"))
        .order_by("month")
    )

    monthly_impression_revenue_qs = (
        impressions_qs.annotate(month=TruncMonth("created_at"))
        .annotate(
            revenue_expr=ExpressionWrapper(
                F("impressions") * F("ecpm") / 1000,
                output_field=FloatField(),
            )
        )
        .values("month")
        .annotate(impression_revenue=Sum("revenue_expr"))
        .order_by("month")
    )

    # Combine monthly stats
    impressions_map = {
        entry["month"].date(): entry["impressions"] or 0
        for entry in monthly_impressions
    }
    impression_revenue_map = {
        entry["month"].date(): round(entry["impression_revenue"] or 0, 6)
        for entry in monthly_impression_revenue_qs
    }

    # Monthly royalty revenue from sales
    sales_qs = ProductSale.objects.filter(product_id=product_id)
    if filters:
        sales_qs = sales_qs.filter(**filters)

    monthly_revenue = (
        sales_qs.annotate(month=TruncMonth("created_at"))
        .values("month")
        .annotate(royalty_revenue=Sum("royalty_amount"))
        .order_by("month")
    )
    royalty_revenue_map = {
        entry["month"].date(): entry["royalty_revenue"] or 0
        for entry in monthly_revenue
    }

    monthly_stats = []
    for i in range(12):
        month = (now.replace(day=1) - timedelta(days=i * 30)).replace(day=1)
        month_date = month.date()

        monthly_stats.append(
            {
                "month": month_date.strftime("%Y-%m"),
                "impressions": impressions_map.get(month_date, 0),
                "impression_revenue": impression_revenue_map.get(month_date, 0),
                "royalty_revenue": royalty_revenue_map.get(month_date, 0),
            }
        )

    monthly_stats.reverse()

    # Total calculations
    total_impressions = (
        impressions_qs.aggregate(Sum("impressions"))["impressions__sum"] or 0
    )

    total_impression_revenue = (
        impressions_qs.annotate(
            revenue_expr=ExpressionWrapper(
                F("impressions") * F("ecpm") / 1000, output_field=FloatField()
            )
        ).aggregate(total=Sum("revenue_expr"))["total"]
        or 0
    )

    total_sales_count = sales_qs.count()

    total_royalty_revenue = (
        sales_qs.aggregate(Sum("royalty_amount"))["royalty_amount__sum"] or 0
    )

    rentals_qs = sales_qs.filter(type=ProductSale.TYPE_RENTAL)
    rentals_count = rentals_qs.count()
    rentals_revenue = (
        rentals_qs.aggregate(Sum("royalty_amount"))["royalty_amount__sum"] or 0
    )

    purchases_qs = sales_qs.filter(type=ProductSale.TYPE_PURCHASE)
    purchases_count = purchases_qs.count()
    purchases_revenue = (
        purchases_qs.aggregate(Sum("royalty_amount"))["royalty_amount__sum"] or 0
    )

    data = {
        "total_impressions": total_impressions,
        "impression_revenue": round(total_impression_revenue, 6),
        "total_sales_count": total_sales_count,
        "total_royalty_revenue": total_royalty_revenue,
        "rentals_count": rentals_count,
        "rentals_revenue": rentals_revenue,
        "purchases_count": purchases_count,
        "purchases_revenue": purchases_revenue,
        "monthly_stats": monthly_stats,
    }

    return data
