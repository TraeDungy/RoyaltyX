from rest_framework import serializers

from .models import Invoice, InvoiceItem


class InvoiceItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvoiceItem
        fields = [
            "id",
            "description",
            "quantity",
            "unit_price",
            "total",
        ]
        read_only_fields = ["total"]


class InvoiceSerializer(serializers.ModelSerializer):
    items = InvoiceItemSerializer(many=True, read_only=True)

    class Meta:
        model = Invoice
        fields = [
            "id",
            "invoice_date",
            "due_date",
            "currency",
            "tax_amount",
            "total_amount",
            "payment_instructions",
            "status",
            "items",
        ]
        read_only_fields = [
            "invoice_date",
            "tax_amount",
            "total_amount",
        ]
