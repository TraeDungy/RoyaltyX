from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status

from apps.project.models import Project, ProjectUser
from apps.white_label.models import WhiteLabelConfig

User = get_user_model()


class WhiteLabelConfigTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email="owner@test.com",
            name="Owner",
            password="Password123_",
        )
        self.project = Project.objects.create(name="Test Project")
        ProjectUser.objects.create(
            project=self.project,
            user=self.user,
            role=ProjectUser.PROJECT_USER_ROLE_OWNER,
        )
        self.user.currently_selected_project = self.project
        self.user.save()
        self.client.force_authenticate(user=self.user)
        self.url = reverse("white_label_config")

    def test_get_default_config(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["project"], self.project.id)
        self.assertTrue(WhiteLabelConfig.objects.filter(project=self.project).exists())
