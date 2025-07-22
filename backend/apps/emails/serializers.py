from rest_framework import serializers

from apps.emails.models import EmailTemplate


class EmailTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailTemplate
        fields = ["id", "name", "subject", "body_html", "template_type", "created_at", "updated_at"]
