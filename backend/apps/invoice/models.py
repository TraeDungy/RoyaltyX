from django.db import models

from apps.project.models import Project
from common.models import BaseModel


class InvoiceTemplate(BaseModel):
    name = models.CharField(max_length=100)
    logo = models.ImageField(upload_to="invoice_templates/", blank=True, null=True)
    layout = models.TextField(blank=True, null=True)

    class Meta:
        db_table = "invoice_template"


class Invoice(BaseModel):
    STATUS_CHOICES = [
        ("draft", "Draft"),
        ("sent", "Sent"),
        ("paid", "Paid"),
    ]

    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    created_by = models.ForeignKey("user.User", on_delete=models.CASCADE)
    template = models.ForeignKey(InvoiceTemplate, on_delete=models.SET_NULL, null=True)
    number = models.CharField(max_length=50)
    currency = models.CharField(max_length=10, default="USD")
    tax_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="draft")
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    payment_instructions = models.TextField(blank=True, null=True)
    due_date = models.DateField(null=True, blank=True)

    class Meta:
        db_table = "invoice"


class InvoiceItem(BaseModel):
    invoice = models.ForeignKey(Invoice, related_name="items", on_delete=models.CASCADE)
    description = models.CharField(max_length=255)
    quantity = models.IntegerField(default=1)
    unit_price = models.DecimalField(max_digits=12, decimal_places=2)
    royalty_fee = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    class Meta:
        db_table = "invoice_item"
