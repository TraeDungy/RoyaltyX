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


class SourceDetailAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email="detail@example.com",
            name="Detail User",
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
        self.source = Source.objects.create(
            account_name="Chan",
            platform=Source.PLATFORM_YOUTUBE,
            project=self.project,
        )
        self.detail_url = f"/sources/{self.source.id}/"

    def test_get_source_detail(self):
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["id"], self.source.id)

    def test_get_source_detail_not_found(self):
        response = self.client.get("/sources/9999/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_source(self):
        data = {"account_name": "Updated"}
        response = self.client.put(self.detail_url, data)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        self.source.refresh_from_db()
        self.assertEqual(self.source.account_name, "Chan")

    def test_delete_source(self):
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        self.assertTrue(Source.objects.filter(id=self.source.id).exists())
