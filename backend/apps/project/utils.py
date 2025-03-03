from django.db.models import F, Sum

from apps.product.models import Product, ProductImpressions, ProductSale


def calculateProjectAnalytics(project_id: int, filters: dict):
    product_count = Product.objects.filter(project_id=project_id).count()

    impressions_qs = ProductImpressions.objects.filter(product__project_id=project_id)
    if filters:
        impressions_qs = impressions_qs.filter(**filters)
    total_impressions = impressions_qs.aggregate(
        Sum('impressions'))['impressions__sum'] or 0

    sales_qs = ProductSale.objects.filter(product__project_id=project_id)
    if filters:
        sales_qs = sales_qs.filter(**filters)
    total_sales_count = sales_qs.count()

    total_royalty_revenue = sales_qs.aggregate(
        total_revenue=Sum(F('royalty_amount') * F('quantity'))
    )['total_revenue'] or 0

    rentals_count = sales_qs.filter(type=ProductSale.TYPE_RENTAL).count()
    purchases_count = sales_qs.filter(type=ProductSale.TYPE_PURCHASE).count()


    data = {
        "product_count": product_count,
        "total_impressions": total_impressions,
        "total_sales_count": total_sales_count,
        "total_royalty_revenue": total_royalty_revenue,
        "rentals_count": rentals_count,
        "purchases_count": purchases_count
    }

    return data
