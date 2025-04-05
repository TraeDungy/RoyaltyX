from django.shortcuts import get_object_or_404

from apps.product.models import ProductImpressions, ProductSale

from .models import File
from .serializers import FileSerializer
from .utils.report_processing import process_report


def create_file(file, data):

    file_name = file.name
    existing_file = File.objects.filter(name=file_name, project=data["project"]).first()

    if existing_file:
        raise ValueError("A file with this name already exists")

    serializer = FileSerializer(data=data)
    if not serializer.is_valid():
        raise ValueError("Invalid file data")

    saved_file = serializer.save()

    report_response = process_report(file, data["project"], saved_file.id)

    return {
        "report": report_response,
        "file": FileSerializer(saved_file).data,
    }


def delete_file(pk):
    file = get_object_or_404(File, pk=pk)

    ProductImpressions.objects.filter(from_file=file).delete()
    ProductSale.objects.filter(from_file=file).delete()

    file.delete()

    return {"message": "File and related data deleted successfully"}
