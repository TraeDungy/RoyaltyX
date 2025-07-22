from rest_framework import serializers

from .models import PerformanceMilestone


class PerformanceMilestoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = PerformanceMilestone
        fields = "__all__"
        read_only_fields = ["id", "created_at", "updated_at", "achieved_at"]
