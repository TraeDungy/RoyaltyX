"""API endpoints for managing email templates."""

from rest_framework import generics, permissions

from apps.emails.models import EmailTemplate
from apps.emails.serializers import EmailTemplateSerializer


class EmailTemplateListCreateView(generics.ListCreateAPIView):
    """List all templates or create a new one."""

    queryset = EmailTemplate.objects.all().order_by("-created_at")
    serializer_class = EmailTemplateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()


class EmailTemplateDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete a template."""

    queryset = EmailTemplate.objects.all()
    serializer_class = EmailTemplateSerializer
    permission_classes = [permissions.IsAuthenticated]
