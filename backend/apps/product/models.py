from django.db import models
from django.db.models import Sum

from apps.data_imports.models import File
from apps.project.models import Project
from apps.sources.models import Source
from common.models import BaseModel


class Product(BaseModel):
    external_id = models.CharField(max_length=255, null=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    source = models.ForeignKey(Source, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    statement_frequency = models.CharField(
        max_length=50,
        null=True,
        choices=[
            ("Monthly", "Monthly"),
            ("Quarterly", "Quarterly"),
            ("Annually", "Annually"),
        ],
    )
    first_statement_end_date = models.DateField(null=True)
    payment_threshold = models.DecimalField(
        max_digits=10, decimal_places=2, default=0.0, null=True
    )
    payment_window = models.IntegerField(
        help_text="Days before payment is processed", blank=True, null=True
    )
    is_active = models.BooleanField(default=True)
    notes = models.TextField(blank=True, null=True)
    thumbnail = models.ImageField(
        upload_to="product_thumbnails/", blank=True, null=True, max_length=500,
    )

    class Meta:
        db_table = "product"

    def total_royalty_earnings(self, period_start=None, period_end=None):
        filters = {"is_refund": False}

        if period_start and period_end:
            filters["period_start__gte"] = period_start
            filters["period_end__lte"] = period_end

        return (
            self.productsale_set.filter(**filters).aggregate(
                total_royalty=Sum("royalty_amount")
            )["total_royalty"]
            or 0
        )

    def total_impressions(self, period_start=None, period_end=None):
        filters = {}

        if period_start and period_end:
            filters["period_start__gte"] = period_start
            filters["period_end__lte"] = period_end

        return (
            self.productimpressions_set.filter(**filters).aggregate(
                total_impressions=Sum("impressions")
            )["total_impressions"]
            or 0
        )

    def impressions_revenue(self, period_start=None, period_end=None):
        filters = {}

        if period_start and period_end:
            filters["period_start__gte"] = period_start
            filters["period_end__lte"] = period_end

        return (
            self.productimpressions_set.filter(**filters).aggregate(
                impressions_revenue=Sum(models.F("impressions") * models.F("ecpm"))
                / 1000
            )["impressions_revenue"]
            or 0
        )


class ProductSale(BaseModel):
    TYPE_RENTAL = "rental"
    TYPE_PURCHASE = "purchase"

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    type = models.CharField(max_length=30)
    unit_price = models.DecimalField(decimal_places=2, max_digits=40)
    unit_price_currency = models.CharField(max_length=10)
    quantity = models.IntegerField()
    from_file = models.ForeignKey(File, on_delete=models.CASCADE, null=True)
    is_refund = models.BooleanField(default=False)
    royalty_amount = models.DecimalField(decimal_places=2, max_digits=40)
    royalty_currency = models.CharField(max_length=10)
    period_start = models.DateField()
    period_end = models.DateField()

    class Meta:
        db_table = "product_sale"


class ProductImpressions(BaseModel):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    impressions = models.IntegerField(null=True)
    from_file = models.ForeignKey(File, on_delete=models.CASCADE, null=True)
    ecpm = models.DecimalField(max_digits=30, decimal_places=18, null=True, blank=True)
    period_start = models.DateField()
    period_end = models.DateField()

    class Meta:
        db_table = "product_impressions"


class ProductUser(BaseModel):
    """Model which represents producers for individual products"""

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey("user.User", on_delete=models.CASCADE)
    producer_fee = models.IntegerField(choices=((i, i) for i in range(1, 101)))

    class Meta:
        unique_together = ("product", "user")
        db_table = "product_user"

class ProductImage(BaseModel):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    product = models.ForeignKey(
        Product,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    image = models.ImageField(upload_to="product_images/", max_length=500)

    class Meta:
        db_table = "product_image"

    def save(self, *args, **kwargs):
        if not self.project_id or not self.product_id:
            self._auto_assign_from_filename()
        super().save(*args, **kwargs)

    def _auto_assign_from_filename(self):
        import os
        import re
        base = os.path.splitext(os.path.basename(self.image.name))[0]
        numbers = re.findall(r"\d+", base)
        if numbers:
            if not self.project_id:
                try:
                    pid = int(numbers[0])
                    Project.objects.get(id=pid)
                    self.project_id = pid
                except (Project.DoesNotExist, ValueError):
                    pass
            if len(numbers) > 1 and not self.product_id:
                try:
                    prod_id = int(numbers[1])
                    Product.objects.get(id=prod_id)
                    self.product_id = prod_id
                except (Product.DoesNotExist, ValueError):
                    pass


