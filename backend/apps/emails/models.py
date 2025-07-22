from django.db import models
from common.models import BaseModel


class EmailTemplate(BaseModel):
    TEMPLATE_TYPE_CHOICES = [
        ("welcome", "Welcome Email"),
        ("password_reset", "Password Reset"),
        ("custom", "Custom"),
    ]

    name = models.CharField(max_length=255, unique=True)
    subject = models.CharField(max_length=255)
    body_html = models.TextField()
    template_type = models.CharField(max_length=50, choices=TEMPLATE_TYPE_CHOICES)

    class Meta:
        db_table = "email_template"

    def __str__(self):
        return self.name
