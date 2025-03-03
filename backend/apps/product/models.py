from django.db import models

from apps.project.models import Project
from common.models import BaseModel


class Product(BaseModel):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    impressions = models.IntegerField(null=True)
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
        upload_to="product_thumbnails/", blank=True, null=True
    )

    class Meta:
        db_table = "product"


class ProductSale(BaseModel):

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    type = models.CharField(max_length=30)
    unit_price = models.DecimalField(decimal_places=2, max_digits=40)
    unit_price_currency = models.CharField(max_length=10)
    quantity = models.IntegerField()
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

    class Meta:
        db_table = "product_impressions"


class ProductUser(BaseModel):
    """ Model which represents producers for individual products """

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey("user.User", on_delete=models.CASCADE)
    producer_fee = models.IntegerField(choices=((i,i) for i in range(1, 101)))

    class Meta:
        unique_together = ("product", "user")
        db_table = "product_user"
