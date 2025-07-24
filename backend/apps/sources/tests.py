from datetime import timedelta
from unittest.mock import patch

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APIClient

from .models import Source
from apps.project.models import Project, ProjectUser


class YouTubeChannelStatsViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        User = get_user_model()
        self.user = User.objects.create_user(
            email="test@example.com",
            name="Test User",
            password="testpass123",
        )
        self.project = Project.objects.create(
            name="Test Project", description="Desc"
        )
        ProjectUser.objects.create(
            project=self.project,
            user=self.user,
            role=ProjectUser.PROJECT_USER_ROLE_OWNER,
        )
        self.user.currently_selected_project = self.project
        self.user.save()

        self.source = Source.objects.create(
            account_name="YouTube",
            platform=Source.PLATFORM_YOUTUBE,
            project=self.project,
            channel_id="abc123",
            _access_token="token",
            token_expires_at=timezone.now() + timedelta(days=1),
        )
        self.url = reverse(
            "source-youtube-channel-stats", kwargs={"pk": self.source.id}
        )

    @patch(
        "apps.sources.views.fetch_youtube_channel_statistics",
        return_value={"subscriberCount": "10"},
    )
    def test_get_channel_stats(self, mock_stats):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["subscriberCount"], "10")
        mock_stats.assert_called_once_with("token", "abc123")

    def test_requires_authentication(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
