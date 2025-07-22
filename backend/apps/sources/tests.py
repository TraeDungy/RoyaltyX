from unittest.mock import patch

from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient

from apps.project.models import Project, ProjectUser
from apps.sources.models import Source

User = get_user_model()


class SourceAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email="source@example.com",
            name="Source User",
            password="pass1234",
        )
        self.project = Project.objects.create(name="Test", description="desc")
        ProjectUser.objects.create(
            project=self.project,
            user=self.user,
            role=ProjectUser.PROJECT_USER_ROLE_OWNER,
        )
        self.user.currently_selected_project = self.project
        self.user.save()
        self.client.force_authenticate(user=self.user)
        self.list_url = "/sources/"

    def test_list_sources_empty(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])

    @patch(
        "apps.sources.views.fetch_youtube_channel_details",
        return_value={"id": "c1", "name": "Channel"},
    )
    @patch("apps.sources.views.fetch_youtube_videos")
    @patch("apps.sources.views.fetch_youtube_stats")
    def test_create_source(self, mock_stats, mock_videos, mock_details):
        data = {
            "account_name": "Chan",
            "platform": Source.PLATFORM_YOUTUBE,
            "access_token": "tok",
        }
        response = self.client.post(self.list_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Source.objects.filter(project=self.project).exists())
