import secrets
import string

from rest_framework import serializers

from .models import Affiliate, AffiliateReferral


class AffiliateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Affiliate
        fields = ["id", "referral_code", "commission_rate", "total_earned"]


class AffiliateSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Affiliate
        fields = []

    def create(self, validated_data):
        user = self.context["user"]
        code = self._generate_code()
        return Affiliate.objects.create(user=user, referral_code=code)

    def _generate_code(self, length: int = 8) -> str:
        alphabet = string.ascii_uppercase + string.digits
        code = "".join(secrets.choice(alphabet) for _ in range(length))
        while Affiliate.objects.filter(referral_code=code).exists():
            code = "".join(secrets.choice(alphabet) for _ in range(length))
        return code


class AffiliateReferralSerializer(serializers.ModelSerializer):
    referred_user_email = serializers.EmailField(
        source="referred_user.email", read_only=True
    )

    class Meta:
        model = AffiliateReferral
        fields = ["id", "referred_user_email", "commission_earned", "created_at"]
