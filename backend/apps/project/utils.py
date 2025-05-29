from datetime import datetime, timedelta

from django.db.models import Count, DecimalField, ExpressionWrapper, F, Sum
from django.db.models.functions import TruncMonth

from apps.product.models import Product, ProductImpressions, ProductSale


def calculateProjectAnalytics(project_id: int, filters: dict):
    now = datetime.now()

    impressions_qs = ProductImpressions.objects.filter(product__project_id=project_id)
    if filters:
        impressions_qs = impressions_qs.filter(**filters)
    monthly_impressions = (
        impressions_qs.annotate(month=TruncMonth("created_at"))
        .values("month")
        .annotate(count=Sum("impressions"))
        .order_by("month")
    )

    impression_revenue_qs = (
        impressions_qs.annotate(
            month=TruncMonth("created_at"),
            revenue_expr=ExpressionWrapper(
                F("impressions") * F("ecpm") / 1000,
                output_field=DecimalField(max_digits=30, decimal_places=18),
            ),
        )
        .values("month")
        .annotate(revenue=Sum("revenue_expr"))
        .order_by("month")
    )

    impression_revenue_map = {
        entry["month"].date(): entry["revenue"] or 0 for entry in impression_revenue_qs
    }

    sales_qs = ProductSale.objects.filter(
        product__project_id=project_id
    )
    if filters:
        sales_qs = sales_qs.filter(**filters)

    monthly_sales = (
        sales_qs.annotate(month=TruncMonth("created_at"))
        .values("month")
        .annotate(count=Count("id"))
        .order_by("month")
    )

    monthly_rentals_qs = sales_qs.filter(type=ProductSale.TYPE_RENTAL)
    monthly_rentals = (
        monthly_rentals_qs.annotate(month=TruncMonth("created_at"))
        .values("month")
        .annotate(count=Count("id"))
        .order_by("month")
    )

    monthly_revenue = (
        sales_qs.annotate(month=TruncMonth("created_at"))
        .values("month")
        .annotate(revenue=Sum("royalty_amount"))
        .order_by("month")
    )

    impressions_map = {
        entry["month"].date(): entry["count"] for entry in monthly_impressions
    }
    sales_map = {entry["month"].date(): entry["count"] for entry in monthly_sales}
    rentals_map = {entry["month"].date(): entry["count"] for entry in monthly_rentals}
    revenue_map = {
        entry["month"].date(): entry["revenue"] or 0 for entry in monthly_revenue
    }

    monthly_stats = []
    for i in range(12):
        month = (now.replace(day=1) - timedelta(days=i * 30)).replace(day=1)
        month = month.date().replace(day=1)
        monthly_stats.append(
            {
                "month": month.strftime("%Y-%m"),
                "impressions": impressions_map.get(month, 0),
                "sales": sales_map.get(month, 0),
                "rentals": rentals_map.get(month, 0),
                "royalty_revenue": revenue_map.get(month, 0),
                "impression_revenue": impression_revenue_map.get(month, 0),
            }
        )

    monthly_stats.reverse()

    # Overall Stats
    product_count = Product.objects.filter(project_id=project_id).count()

    impressions_qs_total = ProductImpressions.objects.filter(
        product__project_id=project_id
    )
    if filters:
        impressions_qs_total = impressions_qs_total.filter(**filters)
    total_impressions = (
        impressions_qs_total.aggregate(Sum("impressions"))["impressions__sum"] or 0
    )

    total_impression_revenue_qs = impressions_qs_total.annotate(
        revenue_expr=ExpressionWrapper(
            F("impressions") * F("ecpm") / 1000,
            output_field=DecimalField(max_digits=30, decimal_places=18),
        )
    ).aggregate(total=Sum("revenue_expr"))

    total_impression_revenue = total_impression_revenue_qs["total"] or 0

    sales_qs_total = ProductSale.objects.filter(product__project_id=project_id)
    if filters:
        sales_qs_total = sales_qs_total.filter(**filters)
    total_sales_count = sales_qs_total.count()

    total_royalty_revenue = (
        sales_qs_total.aggregate(total_revenue=Sum("royalty_amount"))["total_revenue"]
        or 0
    )

    rentals_qs = sales_qs_total.filter(type=ProductSale.TYPE_RENTAL)
    rentals_count = rentals_qs.count()
    rentals_revenue = (
        rentals_qs.aggregate(total_rentals_revenue=Sum("royalty_amount"))[
            "total_rentals_revenue"
        ]
        or 0
    )

    purchases_qs = sales_qs_total.filter(type=ProductSale.TYPE_PURCHASE)
    purchases_count = purchases_qs.count()
    purchases_revenue = (
        purchases_qs.aggregate(total_purchases_revenue=Sum("royalty_amount"))[
            "total_purchases_revenue"
        ]
        or 0
    )

    data = {
        "product_count": product_count,
        "total_impressions": total_impressions,
        "total_sales_count": total_sales_count,
        "total_royalty_revenue": total_royalty_revenue,
        "rentals_count": rentals_count,
        "rentals_revenue": rentals_revenue,
        "purchases_count": purchases_count,
        "purchases_revenue": purchases_revenue,
        "total_impression_revenue": total_impression_revenue,
        "monthly_stats": monthly_stats,
    }

    return data
