from django.shortcuts import get_object_or_404

from apps.product.models import ProductImpressions, ProductSale

from .models import File


def delete_file(pk):
    file = get_object_or_404(File, pk=pk)

    ProductImpressions.objects.filter(from_file=file).delete()
    ProductSale.objects.filter(from_file=file).delete()

    file.delete()

    return {"message": "File and related data deleted successfully"}
