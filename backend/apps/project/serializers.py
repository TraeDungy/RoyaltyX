from rest_framework import serializers
from .models import Project, ProjectUser
from apps.user.models import User
from apps.user.serializers import UserSerializer

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class ProjectUserSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)
    user_details = UserSerializer(source='user', read_only=True)

    class Meta:
        model = ProjectUser
        fields = '__all__'

