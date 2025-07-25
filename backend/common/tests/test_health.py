from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient


class HealthEndpointTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_health_endpoint_returns_ok(self):
        response = self.client.get(reverse("health"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok"})
