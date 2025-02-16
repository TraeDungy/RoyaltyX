from django.db import models
from apps.project.models import Project

class Product(models.Model):
    project = models.ForeignKey(Project, null=True, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    statement_frequency = models.CharField(max_length=50, choices=[
        ("Monthly", "Monthly"),
        ("Quarterly", "Quarterly"),
        ("Annually", "Annually"),
    ])
    first_statement_end_date = models.DateField()
    payment_threshold = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    payment_window = models.IntegerField(help_text="Number of days before payment is processed", blank=True, null=True)
    is_active = models.BooleanField(default=True)
    series_code = models.CharField(max_length=50, blank=True, null=True)
    net_price_must_exceed_mfg_cost = models.BooleanField(default=False)
    notes = models.TextField(blank=True, null=True)
    passthrough_fees = models.BooleanField(default=False)

    def __str__(self):
        return self.title
