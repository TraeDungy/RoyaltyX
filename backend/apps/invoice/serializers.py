from rest_framework import serializers

from .models import Invoice, InvoiceItem, InvoiceTemplate


class InvoiceItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvoiceItem
        fields = [
            "id",
            "description",
            "quantity",
            "unit_price",
            "royalty_fee",
        ]


class InvoiceSerializer(serializers.ModelSerializer):
    items = InvoiceItemSerializer(many=True, required=False)

    class Meta:
        model = Invoice
        fields = [
            "id",
            "number",
            "currency",
            "tax_rate",
            "status",
            "total_amount",
            "payment_instructions",
            "due_date",
            "items",
        ]

    def create(self, validated_data):
        items_data = validated_data.pop("items", [])
        invoice = Invoice.objects.create(**validated_data)
        for item in items_data:
            InvoiceItem.objects.create(invoice=invoice, **item)
        return invoice
