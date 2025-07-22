from django.db import models


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)

    class Meta:
        abstract = True


class TaskStatus(models.Model):
    """Track Celery task progress."""

    celery_id = models.CharField(max_length=255, unique=True)
    progress = models.PositiveIntegerField(default=0)
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "task_status"

    def __str__(self):
        return f"{self.celery_id}: {self.progress}%"
