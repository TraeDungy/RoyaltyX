from rest_framework import serializers

from apps.user.serializers import UserSerializer

from .models import Report


class ReportSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Report
        fields = "__all__"
