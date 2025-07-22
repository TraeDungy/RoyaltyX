from rest_framework import generics, permissions

from .models import Invoice, InvoiceRule
from .serializers import InvoiceRuleSerializer, InvoiceSerializer


class InvoiceListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = InvoiceSerializer

    def get_queryset(self):
        return Invoice.objects.filter(
            customer=self.request.user
        ).prefetch_related("items")

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)


class InvoiceRuleListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = InvoiceRule.objects.all()
    serializer_class = InvoiceRuleSerializer
