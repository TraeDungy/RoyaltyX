from django.db import models
from apps.user.models import User

class Project(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class ProjectUser(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='project_users')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_projects')
    role = models.CharField(max_length=50, choices=[('owner', 'Owner'), ('member', 'Member')], default='member')

    def __str__(self):
        return f"{self.user.username} - {self.project.name} ({self.role})"
