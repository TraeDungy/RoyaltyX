from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.test import TestCase


class WhiteLabelTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            email="test@example.com", name="Test", password="Testpass123"
        )
        self.client.force_authenticate(user=self.user)

    def test_update_and_get_config(self):
        url = reverse("white_label_config")
        data = {
            "brand_name": "My Brand",
            "domain": "brand.com",
            "logo_url": "http://example.com/logo.png",
            "primary_color": "#123456",
            "seat_cost": "40.00",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["brand_name"], "My Brand")

    def test_cost_estimate(self):
        url = reverse("white_label_cost_estimate")
        response = self.client.get(url + "?seats=5&resell_price=60")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("monthly_cost", response.data)
