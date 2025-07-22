from django.db import models


class Project(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "project"


class ProjectUser(models.Model):
    PROJECT_USER_ROLE_OWNER = "owner"
    PROJECT_USER_ROLE_PRODUCER = "producer"
    PROJECT_USER_ROLE_EDITOR = "editor"
    PROJECT_USER_ROLE_VIEWER = "viewer"

    ROLE_CHOICES = [
        (PROJECT_USER_ROLE_OWNER, "Owner"),
        (PROJECT_USER_ROLE_PRODUCER, "Producer"),
        (PROJECT_USER_ROLE_EDITOR, "Editor"),
        (PROJECT_USER_ROLE_VIEWER, "Viewer"),
    ]

    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="project_users"
    )
    user = models.ForeignKey("user.User", on_delete=models.CASCADE)
    role = models.CharField(
        max_length=50,
        choices=ROLE_CHOICES,
        default=PROJECT_USER_ROLE_PRODUCER,
    )

    def __str__(self):
        return f"{self.user.username} - {self.project.name} ({self.role})"

    class Meta:
        unique_together = ("project", "user")
        db_table = "project_user"
