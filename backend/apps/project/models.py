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
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="project_users"
    )
    user = models.ForeignKey("user.User", on_delete=models.CASCADE)
    role = models.CharField(
        max_length=50,
        choices=[("owner", "Owner"), ("producer", "Producer")],
        default="producer",
    )

    def __str__(self):
        return f"{self.user.username} - {self.project.name} ({self.role})"

    class Meta:
        db_table = "project_user"
