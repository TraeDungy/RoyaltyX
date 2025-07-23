import io
from decimal import Decimal

from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from openpyxl import Workbook

from apps.data_imports.models import File, ImportTemplate, Dataset
from apps.data_imports.utils.report_processing import process_report
from apps.data_imports.services import create_file
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


class ImportTemplateTests(TestCase):
    def setUp(self):
        self.project = Project.objects.create(name="P", description="d")

    def _make_csv_file(self, name="sales.csv"):
        content = (
            "Title,Unit Price,Unit Price Currency,Quantity,Royalty Amount,Royalty Currency,"
            "Period Start,Period End\n"
            "Movie,10,USD,1,5,USD,2024-01-01,2024-01-31\n"
        )
        return SimpleUploadedFile(name, content.encode("utf-8"), content_type="text/csv")

    def test_template_autodetection(self):
        file1 = self._make_csv_file("sales1.csv")
        data = {
            "file": file1,
            "project": self.project.id,
            "name": "sales.csv",
            "column_mapping": {"Title": "Title"},
        }
        response = create_file(file1, data)
        dataset_id = response["dataset"]["id"]
        template = ImportTemplate.objects.first()
        self.assertIsNotNone(template)
        self.assertEqual(Dataset.objects.get(id=dataset_id).template, template)

        file2 = self._make_csv_file("sales2.csv")
        data2 = {"file": file2, "project": self.project.id, "name": "sales2.csv"}
        response2 = create_file(file2, data2)
        dataset2 = Dataset.objects.get(id=response2["dataset"]["id"])
        self.assertEqual(dataset2.template, template)
        self.assertEqual(dataset2.column_mapping, template.column_mapping)


