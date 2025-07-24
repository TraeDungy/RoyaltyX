from django.db import models


class PageCustomization(models.Model):
    PAGE_CHOICES = [
        ("landing", "Landing"),
        ("login", "Login"),
        ("signup", "Signup"),
    ]
    page = models.CharField(max_length=20, choices=PAGE_CHOICES, unique=True)
    data = models.JSONField(default=dict, blank=True)

    class Meta:
        db_table = "page_customization"

    def __str__(self):
        return self.page
