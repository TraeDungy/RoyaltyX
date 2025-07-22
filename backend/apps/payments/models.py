from django.db import models


class AddOn(models.Model):
    """Optional recurring add-ons billed through Stripe."""

    code = models.CharField(max_length=50, unique=True)
    stripe_price_id = models.CharField(max_length=255)
    description = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.code

    class Meta:
        db_table = "add_on"
