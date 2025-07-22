from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from .models import Affiliate


class AffiliateTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.User = get_user_model()

        self.user = self.User.objects.create_user(
            email="aff@test.com",
            name="Affiliate User",
            password="Testpass123",
        )

        login_url = reverse("token_obtain_pair")
        response = self.client.post(
            login_url,
            {"email": "aff@test.com", "password": "Testpass123"},
            format="json",
        )
        self.access_token = response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.access_token}")

    def test_affiliate_signup(self):
        url = reverse("affiliate.signup")
        response = self.client.post(url, {})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("referral_code", response.data)
        self.assertTrue(Affiliate.objects.filter(user=self.user).exists())

    def test_referral_tracking(self):
        # Signup as affiliate
        signup_url = reverse("affiliate.signup")
        signup_resp = self.client.post(signup_url, {})
        code = signup_resp.data["referral_code"]

        # Register new user with referral code
        self.client.credentials()  # remove auth
        register_url = reverse("register")
        data = {
            "email": "new@test.com",
            "name": "New User",
            "password": "Pass12345",
            "referral_code": code,
        }
        resp = self.client.post(register_url, data, format="json")
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)

        affiliate = Affiliate.objects.get(user=self.user)
        self.assertEqual(affiliate.referrals.count(), 1)
        referral = affiliate.referrals.first()
        self.assertEqual(referral.referred_user.email, "new@test.com")
