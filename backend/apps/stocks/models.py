from django.db import models

from apps.project.models import Project
from common.models import BaseModel


class Stock(BaseModel):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="stocks")
    symbol = models.CharField(max_length=10)
    account_name = models.CharField(max_length=50, blank=True, null=True)
    last_fetched_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = "stock"
        unique_together = ("project", "symbol")


class StockPrice(BaseModel):
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE, related_name="prices")
    date = models.DateField()
    open = models.DecimalField(max_digits=20, decimal_places=2)
    high = models.DecimalField(max_digits=20, decimal_places=2)
    low = models.DecimalField(max_digits=20, decimal_places=2)
    close = models.DecimalField(max_digits=20, decimal_places=2)
    volume = models.BigIntegerField()

    class Meta:
        db_table = "stock_price"
        unique_together = ("stock", "date")
