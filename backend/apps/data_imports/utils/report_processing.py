import csv
import io
import logging
from decimal import Decimal
from typing import Any, BinaryIO, Dict, List

from openpyxl import load_workbook

from apps.product.models import Product, ProductImpressions, ProductSale

logger = logging.getLogger(__name__)


def detect_file_type(file: BinaryIO) -> str:
    """Return 'xlsx' if the uploaded file is an Excel file, otherwise 'csv'."""
    name = getattr(file, "name", "").lower()
    if name.endswith(".xlsx"):
        return "xlsx"
    return "csv"


def validate_file(file: BinaryIO) -> bool:
    """Validates if the uploaded file contains headers."""
    file_type = detect_file_type(file)
    try:
        if file_type == "xlsx":
            workbook = load_workbook(file, read_only=True)
            file.seek(0)
            sheet = workbook.active
            headers = next(sheet.iter_rows(values_only=True), None)
            return bool(headers)
        else:
            decoded_file = io.StringIO(file.read().decode("utf-8"))
            file.seek(0)
            reader = csv.reader(decoded_file)
            headers = next(reader, None)
            return bool(headers)
    except Exception as e:
        logger.error("File validation error: %s", e)
        return False


def read_csv(file: BinaryIO) -> List[Dict[str, Any]]:
    """Reads a CSV file and returns its content as a list of dictionaries."""
    file.seek(0)
    decoded_file = io.StringIO(file.read().decode("utf-8"))
    reader = csv.DictReader(decoded_file)
    return [row for row in reader]


def read_xlsx(file: BinaryIO) -> List[Dict[str, Any]]:
    """Reads an XLSX file and returns its content as a list of dictionaries."""
    file.seek(0)
    workbook = load_workbook(file, data_only=True)
    sheet = workbook.active
    rows = list(sheet.iter_rows(values_only=True))
    if not rows:
        return []
    headers = [str(h) if h is not None else "" for h in rows[0]]
    data: List[Dict[str, Any]] = []
    for row in rows[1:]:
        row_dict = {headers[i]: row[i] for i in range(len(headers))}
        data.append(row_dict)
    return data


def read_file(file: BinaryIO) -> List[Dict[str, Any]]:
    """Read uploaded file regardless of type."""
    return read_xlsx(file) if detect_file_type(file) == "xlsx" else read_csv(file)


def update_products(
    data: List[Dict[str, str]], project_id: int, file_id: int
) -> Dict[str, int]:
    """Updates products based on CSV data and returns a summary."""
    updated_count = 0

    for row in data:
        title = row.get("Title") or row.get("program_name") or row.get("Title Name")
        if not title:
            continue

        product = Product.objects.filter(title=title, project_id=project_id).first()
        if not product:
            product = Product.objects.create(title=title, project_id=project_id)

        if row.get("Unit Price"):
            storeProductSales(row, product, file_id)

        if row.get("impressions"):
            storeProductImpressions(row, product, file_id)

        updated_count += 1

    return {"updated": updated_count}


def process_report(file: BinaryIO, project_id: int, file_id: int) -> Dict[str, str]:
    """Processes uploaded report and updates products."""
    try:
        if not validate_file(file):
            return {"status": "error", "message": "Invalid file"}

        data = read_file(file)
        result = update_products(data, project_id, file_id)

        return {
            "status": "success",
            "message": f"Updated {result['updated']} products",
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}


def storeProductSales(row: Dict[str, Any], product: Product, file_id: int) -> None:
    ProductSale.objects.create(
        product=product,
        type=row.get("Consumption Type").lower(),
        unit_price=Decimal(row.get("Unit Price")),
        unit_price_currency=row.get("Unit Price Currency"),
        quantity=Decimal(row.get("Quantity")),
        is_refund=row.get("Is Refund") == "Yes",
        royalty_amount=Decimal(row.get("Royalty Amount")),
        royalty_currency=row.get("Royalty Currency"),
        period_start=row.get("Period Start"),
        period_end=row.get("Period End"),
        from_file_id=file_id,
    )


def storeProductImpressions(
    row: Dict[str, Any], product: Product, file_id: int
) -> None:
    try:
        ProductImpressions.objects.create(
            product=product,
            ecpm=Decimal(row.get("ecpm")),
            impressions=row.get("impressions"),
            period_start=row.get("Period Start"),
            period_end=row.get("Period End"),
            from_file_id=file_id,
        )
    except Exception as e:
        logger.error("Failed to store product impressions: %s", e)
