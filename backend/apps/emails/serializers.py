from rest_framework import serializers

from .models import EmailTemplate


class EmailTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailTemplate
        fields = "__all__"


class GenerateTemplateSerializer(serializers.Serializer):
    """Input serializer for AI template generation."""

    prompt = serializers.CharField(max_length=500)
    name = serializers.CharField(max_length=100, required=False)
