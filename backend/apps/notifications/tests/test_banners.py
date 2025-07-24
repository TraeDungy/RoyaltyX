from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase
from rest_framework.test import APIClient

from apps.notifications.models import Banner

User = get_user_model()


class BannerAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin = User.objects.create_user(
            email="admin@example.com",
            name="Admin",
            password="pass1234",
        )
        self.admin.role = "admin"
        self.admin.save()
        self.user = User.objects.create_user(
            email="user@example.com",
            name="User",
            password="pass1234",
        )

    def test_admin_can_create_banner(self):
        self.client.force_authenticate(self.admin)
        url = reverse("admin-banner")
        payload = {"title": "Test", "message": "Hi", "is_active": True}
        res = self.client.post(url, payload, format="json")
        self.assertEqual(res.status_code, 201)
        self.assertEqual(Banner.objects.filter(is_active=True).count(), 1)

    def test_regular_user_cannot_create_banner(self):
        self.client.force_authenticate(self.user)
        url = reverse("admin-banner")
        res = self.client.post(url, {"title": "x"})
        self.assertEqual(res.status_code, 403)

    def test_get_active_banner(self):
        Banner.objects.create(title="Active", is_active=True)
        self.client.force_authenticate(self.user)
        url = reverse("active-banner")
        res = self.client.get(url)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data["title"], "Active")
