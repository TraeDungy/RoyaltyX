from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from apps.project.models import Project
from apps.sources.models import Source


class AdminPanelPermissionTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.User = get_user_model()
        self.admin = self.User.objects.create_user(
            email="admin@example.com", name="Admin", password="pass1234"
        )
        self.admin.role = "admin"
        self.admin.save()
        self.user = self.User.objects.create_user(
            email="user@example.com", name="User", password="pass1234"
        )
        self.project = Project.objects.create(name="P1")
        Source.objects.create(
            account_name="Acc",
            platform=Source.PLATFORM_YOUTUBE,
            project=self.project,
        )

    def test_admin_access_allowed(self):
        self.client.force_authenticate(user=self.admin)
        urls = [
            reverse("admin_dashboard_stats"),
            reverse("users_list"),
            reverse("users_stats"),
            reverse("projects_stats"),
            reverse("sources_stats"),
        ]
        for url in urls:
            res = self.client.get(url)
            self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_non_admin_denied(self):
        self.client.force_authenticate(user=self.user)
        url = reverse("admin_dashboard_stats")
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)
