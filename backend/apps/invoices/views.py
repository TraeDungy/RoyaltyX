from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .invoice_service import InvoiceGenerator
from .models import Invoice
from .serializers import InvoiceSerializer


class InvoiceViewSet(viewsets.ModelViewSet):
    serializer_class = InvoiceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Invoice.objects.filter(user=self.request.user).order_by("-invoice_date")

    @action(detail=False, methods=["post"])
    def generate(self, request):
        """Manually generate an invoice using provided rules"""
        rules = request.data.get("rules", {})
        generator = InvoiceGenerator(request.user, rules)
        invoice = generator.generate()
        serializer = self.get_serializer(invoice)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
