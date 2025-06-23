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


class ReportRequestSerializer(serializers.Serializer):
    period_start = serializers.DateField(required=False)
    period_end = serializers.DateField(required=False)
    template = serializers.IntegerField(required=True)

    def validate_template(self, value):
        project_id = self.context.get('project_id')
        try:
            template_obj = ReportTemplates.objects.get(project_id=project_id, id=value, is_deleted=False)
        except ReportTemplates.DoesNotExist:
            raise serializers.ValidationError("Invalid template for the current project.")
        return template_obj
