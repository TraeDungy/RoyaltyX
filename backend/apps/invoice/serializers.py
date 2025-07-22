from decimal import Decimal

from rest_framework import serializers

from .models import Invoice, InvoiceItem, InvoiceRule


class InvoiceItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvoiceItem
        fields = ["id", "description", "quantity", "unit_price", "total"]
        read_only_fields = ["total"]


class InvoiceSerializer(serializers.ModelSerializer):
    items = InvoiceItemSerializer(many=True)

    class Meta:
        model = Invoice
        fields = [
            "id",
            "invoice_number",
            "customer",
            "issue_date",
            "due_date",
            "currency",
            "subtotal",
            "tax",
            "total",
            "status",
            "payment_method",
            "items",
            "rule",
        ]
        read_only_fields = ["invoice_number", "subtotal", "tax", "total"]

    def create(self, validated_data):
        items_data = validated_data.pop("items", [])
        invoice = Invoice.objects.create(**validated_data)
        subtotal = 0
        for item_data in items_data:
            item = InvoiceItem.objects.create(invoice=invoice, **item_data)
            subtotal += item.total
        invoice.subtotal = subtotal
        invoice.tax = subtotal * Decimal("0.10")  # simple 10% tax
        invoice.total = subtotal + invoice.tax
        invoice.save()
        return invoice


class InvoiceRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvoiceRule
        fields = [
            "id",
            "name",
            "fee_percentage",
            "royalty_percentage",
            "currency",
            "is_active",
        ]
