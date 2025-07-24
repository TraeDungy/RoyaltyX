import csv
import io
import logging
from typing import BinaryIO, Dict, List

from apps.product.models import Product, ProductUser
from apps.user.models import User

logger = logging.getLogger(__name__)


def validate_csv(file: BinaryIO) -> bool:
    """Validates if the uploaded file is a valid CSV."""
    try:
        decoded_file = io.StringIO(file.read().decode("utf-8"))
        file.seek(0)
        reader = csv.reader(decoded_file)
        headers = next(reader, None)
        if not headers:
            return False
        return True
    except Exception as e:
        logger.error("CSV validation error: %s", e)
        return False


def read_csv(file: BinaryIO) -> List[Dict[str, str]]:
    """Reads a CSV file and returns its content as a list of dictionaries."""
    file.seek(0)  # Ensure the file pointer is at the beginning
    decoded_file = io.StringIO(file.read().decode("utf-8"))
    reader = csv.DictReader(decoded_file)

    data = [row for row in reader]
    return data


def update_product_users(data: List[Dict[str, str]], project_id: int):
    """Updates products based on CSV data and returns a summary."""

    for row in data:
        title = row.get("title")
        email = row.get("email")
        producer_fee = row.get("producer fee")

        user = User.objects.filter(email=email).first()

        if not title or not email or not producer_fee or not user:
            continue

        product = Product.objects.filter(title=title, project_id=project_id).first()
        if not product:
            product = Product.objects.create(title=title, project_id=project_id)

        productUser = ProductUser.objects.filter(user=user, product=product).first()
        if not productUser:
            ProductUser.objects.create(
                product=product, user=user, producer_fee=int(producer_fee)
            )

    return {"message": "success"}


def process_producers(file: BinaryIO, project_id: int) -> Dict[str, str]:
    """Processes CSV file with list of producers and updates products."""
    try:
        if not validate_csv(file):
            return {"status": "error", "message": "Invalid CSV file"}

        data = read_csv(file)
        result = update_product_users(data, project_id)

        return {
            "status": "success",
            "message": result,
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}
