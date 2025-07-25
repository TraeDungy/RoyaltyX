import logging

from django.shortcuts import get_object_or_404

from apps.product.models import ProductImpressions, ProductSale

from .models import Dataset, File, ImportTemplate
from .serializers import DatasetSerializer, FileSerializer
from .utils.report_processing import (
    COLUMN_ALIASES,
    detect_headers,
    header_signature,
    parse_date_string,
    parse_month_year_from_filename,
    process_report,
    read_report,
)

logger = logging.getLogger(__name__)


def create_file(file, data):
    file_name = file.name
    existing_file = File.objects.filter(name=file_name, project=data["project"]).first()

    if existing_file:
        raise ValueError("A file with this name already exists")

    serializer = FileSerializer(data=data)
    if not serializer.is_valid():
        logger.error("File serializer errors: %s", serializer.errors)
        raise ValueError(serializer.errors)

    saved_file = serializer.save()

    month, year = 1, 1900
    detected = parse_month_year_from_filename(file_name)

    try:
        rows = read_report(file)
        if rows:
            date_str = rows[0].get("Period Start")
            if date_str:
                parsed = parse_date_string(str(date_str))
                if parsed:
                    month = parsed.month
                    year = parsed.year
    except Exception as e:  # pragma: no cover - log parsing failures
        logger.warning("Failed to derive date from report: %s", e)

    if detected:
        month, year = detected

    headers = detect_headers(file)
    unknown = [h for h in headers if h not in COLUMN_ALIASES]
    if unknown:
        logger.info("Unknown headers on file upload: %s", unknown)
    signature = header_signature(headers)
    template = None
    if headers:
        template = ImportTemplate.objects.filter(
            project=data["project"], header_signature=signature
        ).first()

    column_mapping = data.get("column_mapping", {})
    if template and not column_mapping:
        column_mapping = template.column_mapping

    dataset = Dataset.objects.create(
        file=saved_file,
        month=month,
        year=year,
        status="processing",
        column_mapping=column_mapping,
        template=template,
    )

    report_response = process_report(
        file,
        data["project"],
        saved_file.id,
        column_mapping,
    )

    if not template and column_mapping:
        template = ImportTemplate.objects.create(
            project_id=data["project"],
            name=file_name,
            header_signature=signature,
            column_mapping=column_mapping,
        )
        dataset.template = template
        dataset.save(update_fields=["template"])

    if report_response["status"] == "success":
        dataset.status = "completed"
    else:
        dataset.status = "error"
        dataset.error_message = report_response["message"]
    dataset.save()

    return {
        "report": report_response,
        "file": FileSerializer(saved_file).data,
        "dataset": DatasetSerializer(dataset).data,
    }


def delete_file(pk):
    file = get_object_or_404(File, pk=pk)

    ProductImpressions.objects.filter(from_file=file).delete()
    ProductSale.objects.filter(from_file=file).delete()

    file.delete()

    return {"message": "File and related data deleted successfully"}
