import uuid
from decimal import Decimal

from django.contrib.auth import get_user_model
from django.db import models

from common.models import BaseModel

User = get_user_model()


class InvoiceRule(BaseModel):
    """Rules for invoice generation."""

    name = models.CharField(max_length=255)
    fee_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    royalty_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    currency = models.CharField(max_length=10, default="USD")
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Invoice(BaseModel):
    """Invoice header information."""

    STATUS_CHOICES = [
        ("draft", "Draft"),
        ("sent", "Sent"),
        ("paid", "Paid"),
        ("cancelled", "Cancelled"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    invoice_number = models.CharField(max_length=20, unique=True, editable=False)
    customer = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="invoices",
    )
    issue_date = models.DateField()
    due_date = models.DateField()
    currency = models.CharField(max_length=10, default="USD")
    subtotal = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=Decimal("0.00"),
    )
    tax = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=Decimal("0.00"),
    )
    total = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=Decimal("0.00"),
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="draft")
    payment_method = models.CharField(max_length=50, blank=True, null=True)

    rule = models.ForeignKey(
        InvoiceRule,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    class Meta:
        ordering = ["-issue_date"]

    def __str__(self):
        return self.invoice_number

    def save(self, *args, **kwargs):
        if not self.invoice_number:
            year = self.issue_date.year
            last_invoice = (
                Invoice.objects.filter(invoice_number__startswith=f"INV-{year}")
                .order_by("-invoice_number")
                .first()
            )
            if last_invoice:
                last_number = int(last_invoice.invoice_number.split("-")[-1])
                new_number = last_number + 1
            else:
                new_number = 1
            self.invoice_number = f"INV-{year}-{new_number:04d}"
        super().save(*args, **kwargs)


class InvoiceItem(BaseModel):
    invoice = models.ForeignKey(Invoice, related_name="items", on_delete=models.CASCADE)
    description = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField(default=1)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.DecimalField(max_digits=10, decimal_places=2)

    def save(self, *args, **kwargs):
        self.total = Decimal(self.quantity) * self.unit_price
        super().save(*args, **kwargs)
