from rest_framework import serializers

from .models import Milestone


class MilestoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Milestone
        fields = "__all__"
        read_only_fields = ["is_achieved", "achieved_at", "user", "project"]
