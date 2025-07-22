import io
from decimal import Decimal

from django.test import TestCase
from openpyxl import Workbook

from apps.data_imports.models import File
from apps.data_imports.utils.report_processing import process_report
from apps.product.models import Product, ProductSale
from apps.project.models import Project


class ProcessReportExcelTests(TestCase):
    def setUp(self):
        self.project = Project.objects.create(name="Test", description="p")
        self.file = File.objects.create(project=self.project, name="test.xlsx")

    def _make_excel_file(self):
        wb = Workbook()
        ws = wb.active
        ws.append([
            "Title",
            "Unit Price",
            "Unit Price Currency",
            "Quantity",
            "Royalty Amount",
            "Royalty Currency",
            "Period Start",
            "Period End",
        ])
        ws.append([
            "Prod1",
            "10",
            "USD",
            "1",
            "5",
            "USD",
            "2024-01-01",
            "2024-01-31",
        ])
        stream = io.BytesIO()
        wb.save(stream)
        stream.seek(0)
        stream.name = "report.xlsx"
        return stream

    def test_process_excel_report(self):
        stream = self._make_excel_file()
        response = process_report(stream, self.project.id, self.file.id)
        self.assertEqual(response["status"], "success")
        product = Product.objects.get(title="Prod1")
        sale = ProductSale.objects.get(product=product)
        self.assertEqual(sale.unit_price, Decimal("10"))

