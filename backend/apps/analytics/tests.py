import random
import string
from datetime import date, datetime, timedelta

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from apps.analytics.models import AnalyticsForecast
from apps.analytics.utils import _aggregate_platform, calculate_analytics_by_dimension
from apps.product.models import Product, ProductImpressions, ProductSale
from apps.project.models import Project, ProjectUser


class AnalyticsViewTests(TestCase):
    def setUp(self):
        """Set up test data"""
        self.client = APIClient()

        # Create a test user
        User = get_user_model()
        random_number = "".join(random.choices(string.digits, k=4))
        self.email = f"test_user_{random_number}@test.com"
        self.password = "Testaccount1_"
        self.name = "Test User"

        self.user = User.objects.create_user(
            email=self.email, name=self.name, password=self.password
        )

        # Create a test project
        self.project = Project.objects.create(
            name="Test Project", description="A test project for analytics"
        )

        # Associate user with project
        ProjectUser.objects.create(
            project=self.project,
            user=self.user,
            role=ProjectUser.PROJECT_USER_ROLE_OWNER,
        )

        # Set the project as currently selected for the user
        self.user.currently_selected_project = self.project
        self.user.save()

        # Create a test product
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

        # Authenticate the user
        self.client.force_authenticate(user=self.user)

        # Define URLs
        self.analytics_url = reverse("project-analytics")
        self.product_analytics_url = reverse(
            "product-analytics", kwargs={"product_id": self.product.id}
        )
        self.analytics_export_url = reverse("analytics-export")

    def test_analytics_endpoint_without_parameters(self):
        """Test analytics endpoint without any query parameters"""
        response = self.client.get(self.analytics_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, dict)

    def test_analytics_endpoint_with_date_parameters(self):
        """Test analytics endpoint with period_start and period_end parameters"""
        start_date = date.today() - timedelta(days=30)
        end_date = date.today()

        response = self.client.get(
            self.analytics_url,
            {
                "period_start": start_date.strftime("%Y-%m-%d"),
                "period_end": end_date.strftime("%Y-%m-%d"),
            },
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, dict)

    def test_analytics_endpoint_with_only_start_date(self):
        """Test analytics endpoint with only period_start parameter"""
        start_date = date.today() - timedelta(days=30)

        response = self.client.get(
            self.analytics_url, {"period_start": start_date.strftime("%Y-%m-%d")}
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, dict)

    def test_analytics_endpoint_with_only_end_date(self):
        """Test analytics endpoint with only period_end parameter"""
        end_date = date.today()

        response = self.client.get(
            self.analytics_url, {"period_end": end_date.strftime("%Y-%m-%d")}
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, dict)

    def test_product_analytics_endpoint_without_parameters(self):
        """Test product-specific analytics endpoint without query parameters"""
        response = self.client.get(self.product_analytics_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, dict)

    def test_product_analytics_endpoint_with_date_parameters(self):
        """Test product-specific analytics endpoint with date parameters"""
        start_date = date.today() - timedelta(days=30)
        end_date = date.today()

        response = self.client.get(
            self.product_analytics_url,
            {
                "period_start": start_date.strftime("%Y-%m-%d"),
                "period_end": end_date.strftime("%Y-%m-%d"),
            },
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, dict)

    def test_analytics_endpoint_requires_authentication(self):
        """Test that analytics endpoint requires authentication"""
        # Remove authentication
        self.client.force_authenticate(user=None)

        response = self.client.get(self.analytics_url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_product_analytics_endpoint_requires_authentication(self):
        """Test that product analytics endpoint requires authentication"""
        # Remove authentication
        self.client.force_authenticate(user=None)

        response = self.client.get(self.product_analytics_url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_analytics_endpoint_with_invalid_date_format(self):
        """Test analytics endpoint with invalid date format"""
        response = self.client.get(
            self.analytics_url,
            {
                "period_start": "invalid-date",
                "period_end": "2023-13-45",  # Invalid date
            },
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_product_analytics_with_nonexistent_product_id(self):
        """Test product analytics endpoint with non-existent product ID"""
        nonexistent_product_url = reverse(
            "product-analytics", kwargs={"product_id": 99999}
        )

        response = self.client.get(nonexistent_product_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, dict)

    def test_export_analytics_csv(self):
        """Test exporting analytics data as CSV"""
        response = self.client.get(self.analytics_export_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response["Content-Type"], "text/csv")
        self.assertTrue(response["Content-Disposition"].startswith("attachment"))

    def test_export_requires_authentication(self):
        """Export endpoint should require authentication"""
        self.client.force_authenticate(user=None)

        response = self.client.get(self.analytics_export_url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

class GranularityTests(TestCase):

    def test_determine_granularity_hourly(self):
        from apps.analytics.views import AnalyticsView
        view = AnalyticsView()
        period_start = date.today()
        self.assertEqual(
            view._determine_granularity(period_start, period_start), "hourly"
        )

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
            email="forecast@test.com",
            name="Forecast User",
            password="Testaccount1_",
        )
        self.project = Project.objects.create(
            name="Forecast Project", description="project"
        )
        ProjectUser.objects.create(
            project=self.project,
            user=self.user,
            role=ProjectUser.PROJECT_USER_ROLE_OWNER,
        )
        self.user.currently_selected_project = self.project
        self.user.save()
        self.client.force_authenticate(user=self.user)
        self.forecast_url = reverse("analytics-forecasts")
        AnalyticsForecast.objects.create(
            project=self.project,
            forecast="Test forecast",
        )

    def test_get_forecasts(self):
        response = self.client.get(self.forecast_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, list)

    def test_forecasts_requires_authentication(self):
        self.client.force_authenticate(user=None)
        response = self.client.get(self.forecast_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class CalculateTotalsTests(TestCase):
    def test_calculate_totals_basic(self):
        project = Project.objects.create(name="Totals", description="d")
        product = Product.objects.create(
            project=project,
            title="Prod",
            description="d",
            statement_frequency="Monthly",
            first_statement_end_date=date.today(),
            payment_threshold=0,
            payment_window=30,
            is_active=True,
        )
        ProductImpressions.objects.create(
            product=product,
            impressions=100,
            ecpm=2,
            period_start=date.today(),
            period_end=date.today(),
        )
        ProductSale.objects.create(
            product=product,
            type=ProductSale.TYPE_PURCHASE,
            unit_price=10,
            unit_price_currency="USD",
            quantity=1,
            from_file=None,
            is_refund=False,
            royalty_amount=5,
            royalty_currency="USD",
            period_start=date.today(),
            period_end=date.today(),
        )

        from apps.analytics.utils import calculate_totals

        totals = calculate_totals(
            ProductImpressions.objects.all(),
            ProductSale.objects.all(),
        )
        self.assertEqual(totals["total_impressions"], 100)
        self.assertEqual(totals["total_sales_count"], 1)
        self.assertEqual(totals["total_royalty_revenue"], 5)
        self.assertEqual(totals["total_impression_revenue"], 0)


class ReportingAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        User = get_user_model()
        self.user = User.objects.create_user(
            email="report@test.com",
            name="Report User",
            password="Testaccount1_",
        )
        self.project = Project.objects.create(name="Report", description="d")
        ProjectUser.objects.create(
            project=self.project,
            user=self.user,
            role=ProjectUser.PROJECT_USER_ROLE_OWNER,
        )
        self.user.currently_selected_project = self.project
        self.user.save()
        self.client.force_authenticate(user=self.user)

        from apps.sources.models import Source

        self.source = Source.objects.create(
            account_name="Chan",
            platform=Source.PLATFORM_YOUTUBE,
            project=self.project,
        )

        self.product = Product.objects.create(
            project=self.project,
            source=self.source,
            title="Prod",
            description="d",
            statement_frequency="Monthly",
            first_statement_end_date=date.today(),
            payment_threshold=0,
            payment_window=30,
            is_active=True,
        )

        ProductImpressions.objects.create(
            product=self.product,
            impressions=10,
            ecpm=2,
            period_start=date.today(),
            period_end=date.today(),
        )

        ProductSale.objects.create(
            product=self.product,
            type=ProductSale.TYPE_PURCHASE,
            unit_price=10,
            unit_price_currency="USD",
            quantity=1,
            from_file=None,
            is_refund=False,
            royalty_amount=5,
            royalty_currency="USD",
            period_start=date.today(),
            period_end=date.today(),
        )

        self.reporting_url = reverse("analytics-reporting")

    def test_reporting_by_source(self):
        response = self.client.get(self.reporting_url, {"dimension": "source"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, list)

    def test_reporting_by_platform(self):
        response = self.client.get(self.reporting_url, {"dimension": "platform"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, list)


class DashboardPreferenceAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        User = get_user_model()
        self.user = User.objects.create_user(
            email="prefs@test.com",
            name="Prefs",
            password="Testaccount1_",
        )
        self.client.force_authenticate(user=self.user)
        self.url = reverse("dashboard-preferences")

    def test_get_default_preferences(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, dict)

    def test_update_preferences(self):
        data = {"dashboardAnalyticsOrder": ["sales", "impressions"]}
        response = self.client.put(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        order_key = "dashboardAnalyticsOrder"
        self.assertEqual(response.data[order_key], data[order_key])

        response = self.client.get(self.url)
        self.assertEqual(response.data[order_key], data[order_key])


class AggregatePlatformTests(TestCase):
    def test_aggregate_platform_combines_sources(self):
        data = [
            {
                "platform": "yt",
                "platform_display": "YouTube",
                "analytics": {
                    "total_impressions": 10,
                    "total_impression_revenue": 1.5,
                    "total_sales_count": 2,
                    "total_royalty_revenue": 5,
                    "rentals_count": 1,
                    "rentals_revenue": 2,
                    "purchases_count": 1,
                    "purchases_revenue": 3,
                    "product_count": 1,
                },
            },
            {
                "platform": "yt",
                "platform_display": "YouTube",
                "analytics": {
                    "total_impressions": 5,
                    "total_impression_revenue": 0.5,
                    "total_sales_count": 1,
                    "total_royalty_revenue": 2,
                    "rentals_count": 0,
                    "rentals_revenue": 0,
                    "purchases_count": 1,
                    "purchases_revenue": 2,
                    "product_count": 1,
                },
            },
            {
                "platform": "tt",
                "platform_display": "TikTok",
                "analytics": {
                    "total_impressions": 2,
                    "total_impression_revenue": 0.2,
                    "total_sales_count": 1,
                    "total_royalty_revenue": 1,
                    "rentals_count": 0,
                    "rentals_revenue": 0,
                    "purchases_count": 1,
                    "purchases_revenue": 1,
                    "product_count": 1,
                },
            },
        ]

        result = _aggregate_platform(data)
        by_platform = {entry["platform"]: entry for entry in result}

        yt = by_platform["yt"]
        self.assertEqual(yt["analytics"]["total_impressions"], 15)
        self.assertEqual(yt["analytics"]["total_sales_count"], 3)
        self.assertEqual(yt["analytics"]["purchases_revenue"], 5)

        tt = by_platform["tt"]
        self.assertEqual(tt["analytics"]["total_impressions"], 2)


class CalculateAnalyticsByDimensionTests(TestCase):
    def test_unknown_dimension_raises(self):
        project = Project.objects.create(name="P", description="d")
        with self.assertRaises(ValueError):
            calculate_analytics_by_dimension(project.id, {}, "unknown")
class AnalyticsUtilsOutputTests(TestCase):
    def test_monthly_stats_use_period_key(self):
        from apps.analytics.utils import calculate_monthly_stats
        stats = calculate_monthly_stats(
            ProductImpressions.objects.none(),
            ProductSale.objects.none(),
            1,
            datetime.now(),
        )
        self.assertTrue(stats)
        self.assertIn("period", stats[0])

    def test_yearly_stats_use_period_key(self):
        from apps.analytics.utils import calculate_yearly_stats
        stats = calculate_yearly_stats(
            ProductImpressions.objects.none(),
            ProductSale.objects.none(),
            1,
            datetime.now(),
        )
        self.assertTrue(stats)
        self.assertIn("period", stats[0])

    def test_monthly_stats_single_month(self):
        from apps.analytics.utils import calculate_monthly_stats

        end = datetime(2024, 3, 31)
        stats = calculate_monthly_stats(
            ProductImpressions.objects.none(),
            ProductSale.objects.none(),
            1,
            end,
        )
        self.assertEqual(len(stats), 1)
        self.assertEqual(stats[0]["period"], "2024-03")

    def test_yearly_stats_single_year(self):
        from apps.analytics.utils import calculate_yearly_stats

        end = datetime(2024, 12, 31)
        stats = calculate_yearly_stats(
            ProductImpressions.objects.none(),
            ProductSale.objects.none(),
            1,
            end,
        )
        self.assertEqual(len(stats), 1)
        self.assertEqual(stats[0]["period"], "2024")

    def test_calculate_analytics_monthly_uses_given_end_date(self):
        project = Project.objects.create(name="P", description="d")
        from apps.analytics.utils import calculate_analytics

        start = date(2024, 1, 1)
        end = date(2024, 3, 31)

        data = calculate_analytics(project.id, {}, start, end, None, "monthly")
        periods = [entry["period"] for entry in data["time_stats"]]
        self.assertEqual(periods[-1], "2024-03")


class ProductProjectMismatchTests(TestCase):
    def test_product_must_belong_to_project(self):
        project1 = Project.objects.create(name="P1", description="d")
        project2 = Project.objects.create(name="P2", description="d")

        product = Product.objects.create(
            project=project1,
            title="Prod",
            description="d",
            statement_frequency="Monthly",
            first_statement_end_date=date.today(),
            payment_threshold=0,
            payment_window=30,
            is_active=True,
        )

        from apps.analytics.utils import calculate_analytics

        with self.assertRaises(ValueError):
            calculate_analytics(
                project2.id,
                {},
                date.today(),
                date.today(),
                product.id,
                "monthly",
            )
