from django.db.models import F, Sum

from apps.product.models import Product, ProductImpressions, ProductSale


def calculateProjectAnalytics(project_id: int):
    product_count = Product.objects.filter(project_id=project_id).count()

    total_impressions = ProductImpressions.objects.filter(
        product__project_id=project_id
    ).aggregate(Sum('impressions'))['impressions__sum'] or 0

    total_sales_count = ProductSale.objects.filter(
        product__project_id=project_id
    ).count()

    total_royalty_revenue = ProductSale.objects.filter(
        product__project_id=project_id
    ).aggregate(
        total_revenue=Sum(F('royalty_amount') * F('quantity')))['total_revenue'] or 0


    data = {
        "product_count": product_count,
        "total_impressions": total_impressions,
        "total_sales_count": total_sales_count,
        "total_royalty_revenue": total_royalty_revenue
    }

    return data
