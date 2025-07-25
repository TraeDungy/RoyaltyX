import datetime
from decimal import Decimal

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase

from apps.product.models import Product, ProductImage, ProductImpressions, ProductSale
from apps.project.models import Project


class ProductModelTests(TestCase):
    def setUp(self):
        self.project = Project.objects.create(name="Proj")
        self.product = Product.objects.create(
            project=self.project,
            title="Prod",
            description="",
        )

    def test_total_royalty_earnings(self):
        ProductSale.objects.create(
            product=self.product,
            type="purchase",
            unit_price=Decimal("10.00"),
            unit_price_currency="USD",
            quantity=1,
            royalty_amount=Decimal("4.00"),
            royalty_currency="USD",
            period_start=datetime.date(2024, 1, 1),
            period_end=datetime.date(2024, 1, 31),
        )
        ProductSale.objects.create(
            product=self.product,
            type="purchase",
            unit_price=Decimal("5.00"),
            unit_price_currency="USD",
            quantity=1,
            royalty_amount=Decimal("2.00"),
            royalty_currency="USD",
            period_start=datetime.date(2024, 2, 1),
            period_end=datetime.date(2024, 2, 28),
            is_refund=True,
        )
        total = self.product.total_royalty_earnings()
        self.assertEqual(total, Decimal("4.00"))
        jan_total = self.product.total_royalty_earnings(
            datetime.date(2024, 1, 1),
            datetime.date(2024, 1, 31),
        )
        self.assertEqual(jan_total, Decimal("4.00"))

    def test_impressions_helpers(self):
        ProductImpressions.objects.create(
            product=self.product,
            impressions=100,
            ecpm=Decimal("2.00"),
            period_start=datetime.date(2024, 1, 1),
            period_end=datetime.date(2024, 1, 31),
        )
        total_impr = self.product.total_impressions()
        revenue = self.product.impressions_revenue()
        self.assertEqual(total_impr, 100)
        self.assertEqual(revenue, Decimal("0"))

    def test_product_image_auto_assign(self):
        file_name = f"{self.project.id}_{self.product.id}.jpg"
        uploaded = SimpleUploadedFile(file_name, b"img", content_type="image/jpeg")
        image = ProductImage.objects.create(image=uploaded)
        image.refresh_from_db()
        self.assertEqual(image.project, self.project)
        self.assertEqual(image.product, self.product)
