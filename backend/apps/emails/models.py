from django.db import models

from common.models import BaseModel


class EmailTemplate(BaseModel):
    """Reusable email template with versioning"""

    name = models.CharField(max_length=100)
    subject = models.CharField(max_length=255)
    content = models.TextField()
    version = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "email_template"
        unique_together = ("name", "version")

    def __str__(self) -> str:
        return f"{self.name} v{self.version}"
