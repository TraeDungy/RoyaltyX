from rest_framework import serializers

from apps.user.models import User
from apps.user.serializers import UserSerializer

from .models import Project, ProjectUser


class ProjectUserSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), 
                                              write_only=True)
    user_details = UserSerializer(source='user', read_only=True)

    class Meta:
        model = ProjectUser
        fields = ['id', 'project', 'user', 'user_details', 'role']


class ProjectSerializer(serializers.ModelSerializer):
    users = ProjectUserSerializer(source='project_users', many=True, read_only=True)  

    class Meta:
        model = Project
        fields = '__all__'
