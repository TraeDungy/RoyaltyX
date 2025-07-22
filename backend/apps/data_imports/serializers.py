from rest_framework import serializers

from .models import Dataset, File


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = "__all__"
        extra_kwargs = {
            "name": {"required": False},
        }


class DatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataset
        fields = "__all__"
