from typing import Optional, List, Dict, Any, Union

from datetime import datetime, timedelta, date

from django.db.models import Count, DecimalField, ExpressionWrapper, F, Sum, QuerySet
from django.db.models.functions import TruncMonth

from apps.product.models import Product, ProductImpressions, ProductSale


def calculate_monthly_stats(
        impressions_qs: QuerySet, 
        sales_qs: QuerySet, 
        months: int, 
        period_end: Optional[date]
    ) -> List[Dict[str, Any]]:
    now = datetime.now()

    # Monthly impressions
    monthly_impressions = (
        impressions_qs.annotate(month=TruncMonth("period_start"))
        .values("month")
        .annotate(impressions=Sum("impressions"))
        .order_by("month")
    )

    # Monthly impression revenue
    impression_revenue_qs = (
        impressions_qs.annotate(month=TruncMonth("period_start"))
        .annotate(
            revenue_expr=ExpressionWrapper(
                F("impressions") * F("ecpm") / 1000,
                output_field=DecimalField(max_digits=30, decimal_places=18),
            )
        )
        .values("month")
        .annotate(impression_revenue=Sum("revenue_expr"))
        .order_by("month")
    )

    # Monthly royalty revenue
    monthly_revenue = (
        sales_qs.annotate(month=TruncMonth("period_start"))
        .values("month")
        .annotate(royalty_revenue=Sum("royalty_amount"))
        .order_by("month")
    )

    # Monthly sales count
    monthly_sales = (
        sales_qs.annotate(month=TruncMonth("period_start"))
        .values("month")
        .annotate(count=Count("id"))
        .order_by("month")
    )

    # Monthly rentals
    monthly_rentals_qs = sales_qs.filter(type=ProductSale.TYPE_RENTAL)
    monthly_rentals = (
        monthly_rentals_qs.annotate(month=TruncMonth("period_start"))
        .values("month")
        .annotate(count=Count("id"))
        .order_by("month")
    )

    # Map results by month
    impressions_map = {
        entry["month"]: entry["impressions"] or 0 for entry in monthly_impressions
    }
    impression_revenue_map = {
        entry["month"]: round(entry["impression_revenue"] or 0, 6)
        for entry in impression_revenue_qs
    }
    royalty_revenue_map = {
        entry["month"]: entry["royalty_revenue"] or 0 for entry in monthly_revenue
    }
    sales_map = {entry["month"]: entry["count"] for entry in monthly_sales}
    rentals_map = {entry["month"]: entry["count"] for entry in monthly_rentals}

    monthly_stats = []
    single_month_adjustment = False
    if months == 1:
        months += 1
        single_month_adjustment = True

    for i in range(months):
        if period_end:
            month_date = (
                (period_end.replace(day=1) - timedelta(days=i * 30))
                .replace(day=1)
                .date()
            )
        else:
            month_date = (now.replace(day=1) - timedelta(days=i * 30)).replace(day=1)
            month_date = month_date.date().replace(day=1)

        if single_month_adjustment:
            month_date = (month_date + timedelta(days=31)).replace(day=1)

        monthly_stats.append(
            {
                "month": month_date.strftime("%Y-%m"),
                "impressions": impressions_map.get(month_date, 0),
                "sales": sales_map.get(month_date, 0),
                "rentals": rentals_map.get(month_date, 0),
                "royalty_revenue": royalty_revenue_map.get(month_date, 0),
                "impression_revenue": impression_revenue_map.get(month_date, 0),
            }
        )

    monthly_stats.reverse()
    return monthly_stats


def calculate_totals(
        impressions_qs: QuerySet, 
        sales_qs: QuerySet
    ) -> Dict[str, Union[int, float]]:
    # Total calculations
    total_impressions = (
        impressions_qs.aggregate(Sum("impressions"))["impressions__sum"] or 0
    )

    total_impression_revenue = (
        impressions_qs.annotate(
            revenue_expr=ExpressionWrapper(
                F("impressions") * F("ecpm") / 1000, 
                output_field=DecimalField(max_digits=30, decimal_places=18),
            )
        ).aggregate(total=Sum("revenue_expr"))["total"]
        or 0
    )

    total_sales_count = sales_qs.count()
    total_royalty_revenue = (
        sales_qs.aggregate(total_revenue=Sum("royalty_amount"))["total_revenue"]
        or 0
    )

    rentals_qs = sales_qs.filter(type=ProductSale.TYPE_RENTAL)
    rentals_count = rentals_qs.count()
    rentals_revenue = (
        rentals_qs.aggregate(total_rentals_revenue=Sum("royalty_amount"))[
            "total_rentals_revenue"
        ]
        or 0
    )

    purchases_qs = sales_qs.filter(type=ProductSale.TYPE_PURCHASE)
    purchases_count = purchases_qs.count()
    purchases_revenue = (
        purchases_qs.aggregate(total_purchases_revenue=Sum("royalty_amount"))[
            "total_purchases_revenue"
        ]
        or 0
    )

    data = {
        "total_impressions": total_impressions,
        "total_sales_count": total_sales_count,
        "total_royalty_revenue": total_royalty_revenue,
        "rentals_count": rentals_count,
        "rentals_revenue": rentals_revenue,
        "purchases_count": purchases_count,
        "purchases_revenue": purchases_revenue,
        "total_impression_revenue": total_impression_revenue,
    }

    return data


def calculate_analytics(
        project_id: int, 
        filters: Dict[str, Any], 
        months: int, 
        product_id: int = None
    ) -> Dict[str, Any]:
    if product_id:
        impressions_qs = ProductImpressions.objects.filter(product_id=product_id)
        sales_qs = ProductSale.objects.filter(product_id=product_id)
    else:
        impressions_qs = ProductImpressions.objects.filter(product__project_id=project_id)
        sales_qs = ProductSale.objects.filter(product__project_id=project_id)

    if filters:
        impressions_qs = impressions_qs.filter(**filters)
        sales_qs = sales_qs.filter(**filters)

    monthly_stats = calculate_monthly_stats(
        impressions_qs, sales_qs, months, filters.get("period_end__lte")
    )

    data = calculate_totals(impressions_qs, sales_qs)
    data["monthly_stats"] = monthly_stats

    if not product_id:
        # Only include product count for full project analytics
        data["product_count"] = Product.objects.filter(project_id=project_id).count()

    return data
