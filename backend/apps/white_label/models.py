from django.contrib.auth import get_user_model
from django.db import models


class WhiteLabelConfig(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    brand_name = models.CharField(max_length=255)
    domain = models.CharField(max_length=255)
    logo_url = models.URLField(blank=True, null=True)
    primary_color = models.CharField(max_length=50, default="#1976d2")
    seat_cost = models.DecimalField(max_digits=10, decimal_places=2, default=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.brand_name} ({self.user.email})"

    class Meta:
        db_table = "white_label_config"
