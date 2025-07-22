from decimal import Decimal
from typing import Dict, List

from .models import Invoice, InvoiceItem


class InvoiceGenerator:
    """Simple invoice generator based on rules."""

    def __init__(self, user, rules: Dict):
        self.user = user
        self.rules = rules

    def generate(self) -> Invoice:
        items: List[Dict] = self.rules.get("items", [])
        currency = self.rules.get("currency", "USD")
        payment_instructions = self.rules.get("payment_instructions", "")
        tax_rate = Decimal(str(self.rules.get("tax_rate", 0)))

        invoice = Invoice.objects.create(
            user=self.user,
            currency=currency,
            payment_instructions=payment_instructions,
        )

        subtotal = Decimal("0.00")
        for item in items:
            description = item.get("description", "")
            amount = Decimal(str(item.get("amount", 0)))
            quantity = int(item.get("quantity", 1))
            InvoiceItem.objects.create(
                invoice=invoice,
                description=description,
                quantity=quantity,
                unit_price=amount,
            )
            subtotal += amount * quantity

        tax_amount = (subtotal * tax_rate).quantize(Decimal("0.01"))
        total = subtotal + tax_amount

        invoice.tax_amount = tax_amount
        invoice.total_amount = total
        invoice.save()

        return invoice
