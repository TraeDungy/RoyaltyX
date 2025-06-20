from rest_framework import serializers

from apps.user.serializers import UserSerializer, UserLiteSerializer

from .models import Report, ReportTemplates


class ReportSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Report
        fields = "__all__"


class ReportTemplateSerializer(serializers.ModelSerializer):
    created_by = UserLiteSerializer(read_only=True)

    class Meta:
        model = ReportTemplates
        fields = "__all__"


class ReportTemplateCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportTemplates
        exclude = ['updated_at', 'project', 'created_by']


class ReportTemplateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportTemplates
        exclude = ['updated_at', 'project', 'created_by']
        extra_kwargs = {
            'template_name': {'required': False}
        }
