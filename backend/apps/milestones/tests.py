from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from apps.project.models import Project, ProjectUser

from .models import Milestone


class MilestoneAPITests(TestCase):
    def setUp(self):
        User = get_user_model()
        self.user = User.objects.create_user(email="test@example.com", name="Test", password="pass1234")
        self.project = Project.objects.create(name="Test Project")
        ProjectUser.objects.create(project=self.project, user=self.user, role="owner")
        self.user.currently_selected_project = self.project
        self.user.save()

        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.url = reverse("milestone-list")

    def test_create_milestone(self):
        data = {"metric": "sales", "threshold": 1, "notify_email": True}
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Milestone.objects.count(), 1)
