from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Affiliate(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="affiliate"
    )
    referral_code = models.CharField(max_length=20, unique=True)
    commission_rate = models.DecimalField(max_digits=5, decimal_places=2, default=20.0)
    total_earned = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    class Meta:
        db_table = "affiliate"

    def __str__(self) -> str:
        return f"Affiliate {self.user.email}"


class AffiliateReferral(models.Model):
    affiliate = models.ForeignKey(
        Affiliate, on_delete=models.CASCADE, related_name="referrals"
    )
    referred_user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="referral"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    commission_earned = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    class Meta:
        db_table = "affiliate_referral"

    def __str__(self) -> str:
        return f"Referral {self.referred_user.email} -> {self.affiliate.user.email}"
