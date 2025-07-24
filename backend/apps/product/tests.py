from datetime import date

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from apps.product.models import Product, ProductMetric
from apps.project.models import Project, ProjectUser


class ProductMetricAnalyticsTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        User = get_user_model()
        self.user = User.objects.create_user(
            email="metric@test.com",
            name="Metric",
            password="Testaccount1_",
        )
        self.project = Project.objects.create(name="P", description="d")
        ProjectUser.objects.create(
            project=self.project,
            user=self.user,
            role=ProjectUser.PROJECT_USER_ROLE_OWNER,
        )
        self.user.currently_selected_project = self.project
        self.user.save()
        self.client.force_authenticate(user=self.user)

        self.product = Product.objects.create(project=self.project, title="Prod")
        ProductMetric.objects.create(
            product=self.product,
            name="Views",
            value=5,
            period_start=date.today(),
            period_end=date.today(),
        )
        self.url = reverse("project-analytics")

    def test_extra_metrics_returned(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("extra_metrics", response.data)
        self.assertEqual(response.data["extra_metrics"].get("Views"), 5.0)

