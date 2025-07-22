from datetime import datetime

from django.shortcuts import get_object_or_404

from apps.product.models import ProductImpressions, ProductSale

from .models import Dataset, File
from .serializers import DatasetSerializer, FileSerializer
from .utils.report_processing import process_report, read_report


def create_file(file, data):
    file_name = file.name
    existing_file = File.objects.filter(name=file_name, project=data["project"]).first()

    if existing_file:
        raise ValueError("A file with this name already exists")

    serializer = FileSerializer(data=data)
    if not serializer.is_valid():
        print(serializer.errors, flush=True)
        raise ValueError(serializer.errors)

    saved_file = serializer.save()

    month, year = 1, 1900
    try:
        rows = read_report(file)
        if rows:
            date_str = rows[0].get("Period Start")
            if date_str:
                parsed = datetime.fromisoformat(str(date_str))
                month = parsed.month
                year = parsed.year
    except Exception:
        pass

    column_mapping = data.get("column_mapping", {})
    dataset = Dataset.objects.create(
        file=saved_file,
        month=month,
        year=year,
        status="processing",
        column_mapping=column_mapping,
    )

    report_response = process_report(
        file,
        data["project"],
        saved_file.id,
        column_mapping,
    )

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
