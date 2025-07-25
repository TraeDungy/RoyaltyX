from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient


class AdminTicketPermissionTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        User = get_user_model()
        self.user = User.objects.create_user(
            email="user@example.com",
            name="User",
            password="pass1234",
        )
        self.client.force_authenticate(user=self.user)
        self.url = reverse("support:admin-tickets")

    def test_non_admin_gets_403(self):
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

