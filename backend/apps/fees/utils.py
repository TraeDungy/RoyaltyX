from decimal import Decimal

from django.db import models
from .models import AppliedFee, FeeRule


def apply_fees_to_sale(sale) -> None:
    """Apply all active fee rules to a sale and store them."""
    project_id = sale.product.project_id
    rules = FeeRule.objects.filter(project_id=project_id, is_active=True).filter(
        models.Q(sale_type=FeeRule.SALE_TYPE_ALL) | models.Q(sale_type=sale.type)
    ).select_related("fee_type")

    for rule in rules:
        amount = Decimal("0")
        if rule.percentage:
            amount += sale.royalty_amount * rule.percentage / Decimal("100")
        if rule.fixed_amount:
            amount += rule.fixed_amount
        if amount:
            AppliedFee.objects.create(
                sale=sale,
                fee_type=rule.fee_type,
                rule=rule,
                amount=amount,
            )
