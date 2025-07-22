from rest_framework import serializers

from .models import DashboardTemplate


class DashboardTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = DashboardTemplate
        fields = ["id", "name", "layout_json", "owner", "created_at", "updated_at"]
        read_only_fields = ["id", "owner", "created_at", "updated_at"]
