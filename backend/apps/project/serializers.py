from rest_framework import serializers
from .models import Project, ProjectUser
from apps.user.serializers import UserSerializer

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class ProjectUserSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = ProjectUser
        fields = '__all__'
