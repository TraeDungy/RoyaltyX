"""API endpoints for managing email templates."""

import json

import openai
from django.conf import settings
from rest_framework import generics, permissions, status
from rest_framework.response import Response

from apps.emails.models import EmailTemplate
from apps.emails.serializers import (
    EmailTemplateSerializer,
    GenerateTemplateSerializer,
)


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


class GenerateEmailTemplateView(generics.GenericAPIView):
    """Generate a template using OpenAI and save it."""

    serializer_class = GenerateTemplateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):  # pragma: no cover - network call tested via mock
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        prompt = serializer.validated_data["prompt"]
        name = serializer.validated_data.get("name", "generated")

        if not settings.OPENAI_API_KEY:
            return Response(
                {"error": "OpenAI API key is not configured."},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        try:
            client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)
            completion = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
            )
            answer = completion.choices[0].message.content.strip()
            data = json.loads(answer)
            subject = data["subject"]
            content = data["content"]
        except Exception as exc:
            return Response(
                {"error": f"OpenAI request failed: {exc}"},
                status=status.HTTP_502_BAD_GATEWAY,
            )

        template = EmailTemplate.objects.create(
            name=name, subject=subject, content=content
        )
        out = EmailTemplateSerializer(template).data
        return Response(out, status=status.HTTP_201_CREATED)
