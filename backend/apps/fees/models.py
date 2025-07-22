from decimal import Decimal

from django.db import models

from apps.product.models import ProductSale
from apps.project.models import Project
from common.models import BaseModel


class FeeType(BaseModel):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "fee_type"

    def __str__(self) -> str:
        return self.name


class FeeRule(BaseModel):
    SALE_TYPE_ALL = "all"

    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    fee_type = models.ForeignKey(FeeType, on_delete=models.CASCADE)
    sale_type = models.CharField(
        max_length=30,
        choices=[
            (SALE_TYPE_ALL, "All"),
            (ProductSale.TYPE_RENTAL, "Rental"),
            (ProductSale.TYPE_PURCHASE, "Purchase"),
        ],
        default=SALE_TYPE_ALL,
    )
    percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    fixed_amount = models.DecimalField(
        max_digits=10, decimal_places=2, default=Decimal("0.00")
    )
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "fee_rule"

    def __str__(self) -> str:
        return f"{self.fee_type.name} - {self.project.name}"


class AppliedFee(BaseModel):
    sale = models.ForeignKey(ProductSale, on_delete=models.CASCADE)
    fee_type = models.ForeignKey(FeeType, on_delete=models.CASCADE)
    rule = models.ForeignKey(FeeRule, on_delete=models.SET_NULL, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = "applied_fee"

    def __str__(self) -> str:
        return f"{self.fee_type.name}: {self.amount}"
