import io
from decimal import Decimal

from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from django.urls import reverse
from openpyxl import Workbook
from rest_framework import status
from rest_framework.test import APIClient

from apps.data_imports.models import Dataset, File, ImportTemplate
from apps.data_imports.services import create_file
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


class ImportTemplateTests(TestCase):
    def setUp(self):
        self.project = Project.objects.create(name="P", description="d")

    def _make_csv_file(self, name="sales.csv"):
        content = "\n".join(
            [
                (
                    "Title,Unit Price,Unit Price Currency,Quantity,"
                    "Royalty Amount,Royalty Currency,"
                ),
                "Period Start,Period End",
                "Movie,10,USD,1,5,USD,2024-01-01,2024-01-31",
            ]
        ) + "\n"
        return SimpleUploadedFile(
            name,
            content.encode("utf-8"),
            content_type="text/csv",
        )

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


class FilenameDateDetectionTests(TestCase):
    def setUp(self):
        self.project = Project.objects.create(name="Proj", description="d")

    def _make_csv_file(self, name="report_2024-04.csv"):
        content = "Title\nMovie\n"
        return SimpleUploadedFile(
            name,
            content.encode("utf-8"),
            content_type="text/csv",
        )

    def test_create_file_uses_filename_date(self):
        file1 = self._make_csv_file()
        data = {"file": file1, "project": self.project.id, "name": file1.name}
        response = create_file(file1, data)
        dataset = Dataset.objects.get(id=response["dataset"]["id"])
        self.assertEqual(dataset.month, 4)
        self.assertEqual(dataset.year, 2024)


class DatasetPatchTests(TestCase):
    def setUp(self):
        User = get_user_model()
        self.user = User.objects.create_user(
            email="tester@example.com", name="Tester", password="pass1234"
        )
        self.project = Project.objects.create(name="P2", description="d")
        self.user.currently_selected_project = self.project
        self.user.save()
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        self.file = File.objects.create(project=self.project, name="r.csv")
        self.dataset = Dataset.objects.create(
            file=self.file, month=1, year=1900, status="completed"
        )

    def test_patch_updates_month_year(self):
        url = reverse("dataset-detail", kwargs={"pk": self.dataset.id})
        res = self.client.patch(url, {"month": 7, "year": 2025}, format="json")
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.dataset.refresh_from_db()
        self.assertEqual(self.dataset.month, 7)
        self.assertEqual(self.dataset.year, 2025)


class MissingColumnsTests(TestCase):
    def setUp(self):
        self.project = Project.objects.create(name="M", description="d")

    def test_create_file_with_missing_columns(self):
        content = "Title\nOnlyTitle\n"
        file_obj = SimpleUploadedFile(
            "m.csv",
            content.encode("utf-8"),
            content_type="text/csv",
        )
        data = {"file": file_obj, "project": self.project.id, "name": "m.csv"}
        response = create_file(file_obj, data)
        dataset = Dataset.objects.get(id=response["dataset"]["id"])
        self.assertEqual(dataset.status, "error")
        self.assertIn("Missing columns", dataset.error_message)





