from rest_framework import serializers

from .models import AddOn


class AddOnSerializer(serializers.ModelSerializer):
    """Serializer for subscription add-ons."""

    class Meta:
        model = AddOn
        fields = ["id", "code", "stripe_price_id", "description"]
