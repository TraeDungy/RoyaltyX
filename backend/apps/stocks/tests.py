import random
import string
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from unittest.mock import patch

from apps.project.models import Project, ProjectUser
from .models import Stock


class StockViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        User = get_user_model()
        rnd = "".join(random.choices(string.digits, k=4))
        email = f"user_{rnd}@test.com"
        self.user = User.objects.create_user(email=email, name="User", password="pass1234")
        self.project = Project.objects.create(name="P1")
        ProjectUser.objects.create(project=self.project, user=self.user, role=ProjectUser.PROJECT_USER_ROLE_OWNER)
        self.user.currently_selected_project = self.project
        self.user.save()
        self.client.force_authenticate(user=self.user)
        self.stocks_url = reverse("stocks")

    @patch("apps.stocks.views.update_all_stock_prices")
    def test_create_stock(self, mock_update):
        data = {"symbol": "AAPL"}
        response = self.client.post(self.stocks_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Stock.objects.count(), 1)
        mock_update.assert_called()

    def test_list_stocks_requires_auth(self):
        self.client.force_authenticate(user=None)
        response = self.client.get(self.stocks_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
