import random
import string
from decimal import Decimal
from datetime import date

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status

from apps.product.models import Product, ProductSale
from apps.project.models import Project, ProjectUser
from .models import AppliedFee, FeeRule, FeeType
from .utils import apply_fees_to_sale


class FeeEndpointsTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        User = get_user_model()
        random_number = "".join(random.choices(string.digits, k=4))
        self.email = f"test_{random_number}@example.com"
        self.user = User.objects.create_user(
            email=self.email,
            name="Test User",
            password="TestPassword123_",
        )
        self.project = Project.objects.create(name="Test Project")
        ProjectUser.objects.create(
            project=self.project,
            user=self.user,
            role=ProjectUser.PROJECT_USER_ROLE_OWNER,
        )
        self.user.currently_selected_project = self.project
        self.user.save()
        self.client.force_authenticate(user=self.user)
        self.type_url = reverse("fee-type-list")
        self.rule_url = reverse("fee-rule-list")
        self.analytics_url = reverse("fee-analytics")

    def test_fee_type_and_rule_creation_and_analytics(self):
        # Create fee type
        response = self.client.post(
            self.type_url, {"name": "Platform Fee"}, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        fee_type_id = response.data["id"]

        # Create fee rule
        rule_data = {
            "fee_type": fee_type_id,
            "sale_type": FeeRule.SALE_TYPE_ALL,
            "percentage": "10.0",
        }
        response = self.client.post(self.rule_url, rule_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Create product and sale
        product = Product.objects.create(project=self.project, title="Prod")
        sale = ProductSale.objects.create(
            product=product,
            type=ProductSale.TYPE_PURCHASE,
            unit_price=Decimal("20.00"),
            unit_price_currency="USD",
            quantity=1,
            royalty_amount=Decimal("20.00"),
            royalty_currency="USD",
            period_start=date.today(),
            period_end=date.today(),
        )
        apply_fees_to_sale(sale)

        # Verify AppliedFee created
        self.assertEqual(AppliedFee.objects.count(), 1)
        applied_fee = AppliedFee.objects.first()
        self.assertEqual(applied_fee.amount, Decimal("2.00"))

        # Analytics endpoint
        response = self.client.get(self.analytics_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get("Platform Fee"), Decimal("2.00"))
