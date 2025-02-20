import csv
import io
from typing import List, Dict, BinaryIO
from apps.product.models import Product

def validate_csv(file: BinaryIO) -> bool:
    """Validates if the uploaded file is a valid CSV."""
    try:
        decoded_file = io.StringIO(file.read().decode('utf-8'))
        file.seek(0)
        reader = csv.reader(decoded_file)
        headers = next(reader, None)
        if not headers:
            return False
        return True
    except Exception as e:
        print(f"CSV validation error: {e}")
        return False

def read_csv(file: BinaryIO) -> List[Dict[str, str]]:
    """Reads a CSV file and returns its content as a list of dictionaries."""
    file.seek(0)  # Ensure the file pointer is at the beginning
    decoded_file = io.StringIO(file.read().decode('utf-8'))
    reader = csv.DictReader(decoded_file)
    
    data = [row for row in reader]
    return data

def update_products(data: List[Dict[str, str]]) -> Dict[str, int]:
    """Updates products based on CSV data and returns a summary."""
    updated_count = 0
    not_found_count = 0

    for row in data:
        title = row.get('Title')
        if not title:
            continue

        existing_product = Product.objects.filter(title=title).first()
        if existing_product:
            existing_product.statement_frequency = row.get('Statement Frequency')
            existing_product.first_statement_end_date = row.get('First Statement End Date')
            existing_product.payment_threshold = row.get('Payment Threshold')
            existing_product.payment_window = row.get('Payment Window')
            existing_product.is_active = row.get('Active') == 'true'
            existing_product.series_code = row.get('Series Code')
            existing_product.net_price_must_exceed_mfg_cost = row.get('Net Price Must Exceed MFG Cost') == 'true'
            existing_product.notes = row.get('Notes')
            existing_product.passthrough_fees = row.get('Passthrough Fees') == 'true'
            existing_product.save()

            updated_count += 1
        else:
            not_found_count += 1

    return {"updated": updated_count, "not_found": not_found_count}

def process_report(file: BinaryIO) -> Dict[str, str]:
    """Processes the CSV report and updates products. Returns success or error message."""
    try:
        if not validate_csv(file):
            return {"status": "error", "message": "Invalid CSV file"}

        data = read_csv(file)
        result = update_products(data)

        return {
            "status": "success",
            "message": f"Updated {result['updated']} products, {result['not_found']} not found"
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}
