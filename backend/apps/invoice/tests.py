from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient

from apps.project.models import Project
from .models import Invoice


class InvoiceTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.User = get_user_model()
        self.user = self.User.objects.create_user(
            email="invoice_test@example.com",
            password="StrongPass1_",
        )
        self.project = Project.objects.create(name="Invoice Project")
        self.user.currently_selected_project = self.project
        self.user.save()
        login_url = reverse("token_obtain_pair")
        response = self.client.post(
            login_url,
            {"email": "invoice_test@example.com", "password": "StrongPass1_"},
            format="json",
        )
        self.token = response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")

    def test_create_invoice(self):
        url = reverse("invoice-list-create")
        data = {
            "number": "INV-001",
            "currency": "USD",
            "tax_rate": "10.00",
            "items": [
                {"description": "Service", "quantity": 1, "unit_price": "100.00"}
            ],
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Invoice.objects.count(), 1)
