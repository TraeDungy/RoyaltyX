from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.project.models import Project

User = get_user_model()


class ReportTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            name="Test User", email="testuser", password="testpass"
        )
        self.project = Project.objects.create(name="Test Project", user=self.user)
        self.user.currently_selected_project_id = self.project.id
        self.user.save()

        self.client.force_authenticate(user=self.user)

    def test_create_report(self):
        url = reverse("reports-view")

        response = self.client.post(
            url,
            data={},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
