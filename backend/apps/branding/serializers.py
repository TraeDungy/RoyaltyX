from rest_framework import serializers

from .models import PageCustomization


class PageCustomizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageCustomization
        fields = ["page", "data"]
