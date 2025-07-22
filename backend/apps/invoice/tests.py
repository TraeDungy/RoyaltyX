from django.contrib.auth import get_user_model
from django.db import models
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Invoice, InvoiceItem


class InvoiceTests(APITestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            email="test@example.com",
            password="Testpass1_",
            name="Test User",
        )
        self.client.force_authenticate(user=self.user)
        self.url = reverse("invoice-list-create")

    def test_create_invoice(self):
        payload = {
            "issue_date": "2024-01-01",
            "due_date": "2024-01-15",
            "currency": "USD",
            "items": [
                {"description": "Service Fee", "quantity": 1, "unit_price": "100.00"},
                {"description": "Royalty", "quantity": 2, "unit_price": "50.00"},
            ],
        }
        response = self.client.post(self.url, payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        invoice = Invoice.objects.get(id=response.data["id"])
        calculated_total = InvoiceItem.objects.filter(invoice=invoice).aggregate(
            total=models.Sum("total")
        )["total"]
        self.assertEqual(invoice.subtotal, calculated_total)
        self.assertEqual(invoice.currency, "USD")

