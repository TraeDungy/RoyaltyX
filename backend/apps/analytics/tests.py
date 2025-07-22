import random
import string
from datetime import date, timedelta

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from apps.product.models import Product
from apps.analytics.models import AnalyticsRecord, AnalyticsForecast
from apps.project.models import Project, ProjectUser


class AnalyticsViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        User = get_user_model()
        random_number = "".join(random.choices(string.digits, k=4))
        self.email = f"test_user_{random_number}@test.com"
        self.password = "Testaccount1_"
        self.user = User.objects.create_user(
            email=self.email, name="Test User", password=self.password
        )
        self.project = Project.objects.create(
            name="Test Project", description="A test project for analytics"
        )
        ProjectUser.objects.create(
            project=self.project,
            user=self.user,
            role=ProjectUser.PROJECT_USER_ROLE_OWNER,
        )
        self.user.currently_selected_project = self.project
        self.user.save()
        self.product = Product.objects.create(
            project=self.project,
            title="Test Product",
            description="A test product for analytics",
            statement_frequency="Monthly",
            first_statement_end_date=date.today(),
            payment_threshold=100.00,
            payment_window=30,
            is_active=True,
        )
        self.client.force_authenticate(user=self.user)
        self.analytics_url = reverse("project-analytics")
        self.product_analytics_url = reverse(
            "product-analytics", kwargs={"product_id": self.product.id}
        )
        self.analytics_export_url = reverse("analytics-export")

    def test_analytics_endpoint_without_parameters(self):
        response = self.client.get(self.analytics_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, dict)

    def test_analytics_endpoint_with_date_parameters(self):
        start_date = date.today() - timedelta(days=30)
        end_date = date.today()
        response = self.client.get(
            self.analytics_url,
            {"period_start": start_date.strftime("%Y-%m-%d"), "period_end": end_date.strftime("%Y-%m-%d")},
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, dict)

    def test_analytics_endpoint_with_only_start_date(self):
        start_date = date.today() - timedelta(days=30)
        response = self.client.get(self.analytics_url, {"period_start": start_date.strftime("%Y-%m-%d")})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, dict)

    def test_analytics_endpoint_with_only_end_date(self):
        end_date = date.today()
        response = self.client.get(self.analytics_url, {"period_end": end_date.strftime("%Y-%m-%d")})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, dict)

    def test_product_analytics_endpoint_without_parameters(self):
        response = self.client.get(self.product_analytics_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, dict)

    def test_product_analytics_endpoint_with_date_parameters(self):
        start_date = date.today() - timedelta(days=30)
        end_date = date.today()
        response = self.client.get(
            self.product_analytics_url,
            {"period_start": start_date.strftime("%Y-%m-%d"), "period_end": end_date.strftime("%Y-%m-%d")},
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, dict)

    def test_analytics_endpoint_requires_authentication(self):
        self.client.force_authenticate(user=None)
        response = self.client.get(self.analytics_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_product_analytics_endpoint_requires_authentication(self):
        self.client.force_authenticate(user=None)
        response = self.client.get(self.product_analytics_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_analytics_endpoint_with_invalid_date_format(self):
        response = self.client.get(
            self.analytics_url,
            {"period_start": "invalid-date", "period_end": "2023-13-45"},
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_product_analytics_with_nonexistent_product_id(self):
        nonexistent_product_url = reverse("product-analytics", kwargs={"product_id": 99999})
        response = self.client.get(nonexistent_product_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, dict)

    def test_export_analytics_csv(self):
        response = self.client.get(self.analytics_export_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response["Content-Type"], "text/csv")
        self.assertTrue(response["Content-Disposition"].startswith("attachment"))

    def test_export_requires_authentication(self):
        self.client.force_authenticate(user=None)
        response = self.client.get(self.analytics_export_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class AnalyticsRecordModelTests(TestCase):
    def setUp(self):
        User = get_user_model()
        self.user = User.objects.create_user(email="record@test.com", name="Record User", password="pass1234")
        self.project = Project.objects.create(name="Record Project")
        ProjectUser.objects.create(project=self.project, user=self.user, role=ProjectUser.PROJECT_USER_ROLE_OWNER)
        self.product = Product.objects.create(
            project=self.project,
            title="Record Product",
            description="desc",
            statement_frequency="Monthly",
            first_statement_end_date=date.today(),
            payment_threshold=0,
            payment_window=30,
            is_active=True,
        )

    def test_create_analytics_record(self):
        record = AnalyticsRecord.objects.create(
            project=self.project,
            product=self.product,
            period_start=date.today(),
            period_end=date.today(),
            impressions=10,
            impression_revenue=1.23,
            sales=2,
            rentals=1,
            royalty_revenue=5.50,
            granularity="daily",
        )
        self.assertEqual(AnalyticsRecord.objects.count(), 1)
        self.assertEqual(record.sales, 2)


class GranularityTests(TestCase):
    def test_determine_granularity_hourly(self):
        from apps.analytics.views import AnalyticsView
        view = AnalyticsView()
        start = date.today()
        self.assertEqual(view._determine_granularity(start, start), "hourly")

    def test_determine_granularity_daily(self):
        from apps.analytics.views import AnalyticsView
        view = AnalyticsView()
        start = date.today() - timedelta(days=5)
        end = date.today()
        self.assertEqual(view._determine_granularity(start, end), "daily")

    def test_determine_granularity_monthly(self):
        from apps.analytics.views import AnalyticsView
        view = AnalyticsView()
        start = date.today() - timedelta(days=90)
        end = date.today()
        self.assertEqual(view._determine_granularity(start, end), "monthly")

    def test_determine_granularity_yearly(self):
        from apps.analytics.views import AnalyticsView
        view = AnalyticsView()
        start = date.today() - timedelta(days=800)
        end = date.today()
        self.assertEqual(view._determine_granularity(start, end), "yearly")


class ForecastViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        User = get_user_model()
        self.user = User.objects.create_user(
            email="forecast@test.com", name="Forecast User", password="Testaccount1_"
        )
        self.project = Project.objects.create(name="Forecast Project", description="project")
        ProjectUser.objects.create(project=self.project, user=self.user, role=ProjectUser.PROJECT_USER_ROLE_OWNER)
        self.user.currently_selected_project = self.project
        self.user.save()
        self.client.force_authenticate(user=self.user)
        self.forecast_url = reverse("analytics-forecasts")
        AnalyticsForecast.objects.create(project=self.project, forecast="Test forecast")

    def test_get_forecasts(self):
        response = self.client.get(self.forecast_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, list)

    def test_forecasts_requires_authentication(self):
        self.client.force_authenticate(user=None)
        response = self.client.get(self.forecast_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
