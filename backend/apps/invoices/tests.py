import random
import string

from django.contrib.auth import get_user_model
from django.test import TestCase

from .invoice_service import InvoiceGenerator

User = get_user_model()


class InvoiceGenerationTests(TestCase):
    def setUp(self):
        random_number = "".join(random.choices(string.digits, k=4))
        self.email = f"user_{random_number}@test.com"
        self.user = User.objects.create_user(
            email=self.email, name="Test User", password="Password1_"
        )

    def test_generate_invoice_simple_rule(self):
        rules = {
            "items": [
                {"description": "Service Fee", "amount": 10, "quantity": 1},
                {"description": "Royalty", "amount": 5, "quantity": 2},
            ],
            "currency": "USD",
            "tax_rate": 0.1,
            "payment_instructions": "Pay via Stripe",
        }

        generator = InvoiceGenerator(self.user, rules)
        invoice = generator.generate()

        self.assertEqual(invoice.currency, "USD")
        self.assertEqual(invoice.items.count(), 2)
        # Subtotal = 10 + 5*2 = 20
        # Tax 10% -> 2
        self.assertEqual(float(invoice.tax_amount), 2.0)
        self.assertEqual(float(invoice.total_amount), 22.0)
