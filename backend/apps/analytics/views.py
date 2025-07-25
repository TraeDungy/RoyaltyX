import csv
from datetime import datetime, time

from django.http import HttpResponse
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.analytics.models import AnalyticsForecast, DashboardPreference
from apps.analytics.serializers import (
    AnalyticsForecastSerializer,
    AnalyticsSerializer,
    DashboardPreferenceSerializer,
    ReportingSerializer,
)
from apps.analytics.utils import (
    calculate_analytics,
    calculate_analytics_by_dimension,
)


class AnalyticsView(APIView):
    permission_classes = [IsAuthenticated]

    def _determine_granularity(self, period_start, period_end):
        """Determine appropriate granularity based on date range"""
        if not period_start or not period_end:
            return "monthly"

        delta = period_end - period_start

        if delta.days <= 1:
            return "hourly"
        elif delta.days <= 31:  # Approximately 1 month
            return "daily"
        elif delta.days <= 365:
            return "monthly"
        else:
            return "yearly"

    def get(self, request, product_id=None):
        serializer = AnalyticsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        project_id = request.user.currently_selected_project_id
        period_start = serializer.validated_data.get("period_start", None)
        period_end = serializer.validated_data.get("period_end", None)

        filters = {}

        if period_start and period_end:
            start_date = datetime.combine(period_start, time.min)
            end_date = datetime.combine(period_end, time.max)
            filters["period_start__gte"] = start_date
            filters["period_end__lte"] = end_date

        granularity = self._determine_granularity(period_start, period_end)

        data = calculate_analytics(
            project_id, filters, period_start, period_end, product_id, granularity
        )

        return Response(data, status=status.HTTP_200_OK)


class AnalyticsExportView(APIView):
    """Export analytics data as CSV."""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = AnalyticsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        project_id = request.user.currently_selected_project_id
        period_start = serializer.validated_data.get("period_start", None)
        period_end = serializer.validated_data.get("period_end", None)

        filters = {}
        if period_start and period_end:
            start_date = datetime.combine(period_start, time.min)
            end_date = datetime.combine(period_end, time.max)
            filters["period_start__gte"] = start_date
            filters["period_end__lte"] = end_date

        granularity = AnalyticsView()._determine_granularity(period_start, period_end)

        data = calculate_analytics(
            project_id, filters, period_start, period_end, None, granularity
        )

        response = HttpResponse(content_type="text/csv")
        response["Content-Disposition"] = 'attachment; filename="analytics.csv"'

        writer = csv.writer(response)
        writer.writerow(
            [
                "period",
                "impressions",
                "sales",
                "rentals",
                "royalty_revenue",
                "impression_revenue",
            ]
        )
        for item in data.get("time_stats", []):
            writer.writerow(
                [
                    item.get("period"),
                    item.get("impressions"),
                    item.get("sales"),
                    item.get("rentals"),
                    item.get("royalty_revenue"),
                    item.get("impression_revenue"),
                ]
            )

        return response


class AnalyticsForecastView(APIView):
    """Retrieve analytics forecasts for the current project."""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        project_id = request.user.currently_selected_project_id
        forecasts = AnalyticsForecast.objects.filter(project_id=project_id)
        serializer = AnalyticsForecastSerializer(forecasts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AnalyticsReportingView(APIView):
    """Return analytics grouped by a dimension."""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = ReportingSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        project_id = request.user.currently_selected_project_id
        period_start = serializer.validated_data.get("period_start")
        period_end = serializer.validated_data.get("period_end")
        dimension = serializer.validated_data.get("dimension")

        filters = {}
        if period_start and period_end:
            start_date = datetime.combine(period_start, time.min)
            end_date = datetime.combine(period_end, time.max)
            filters["period_start__gte"] = start_date
            filters["period_end__lte"] = end_date

        data = calculate_analytics_by_dimension(project_id, filters, dimension)
        return Response(data, status=status.HTTP_200_OK)


class DashboardPreferenceView(APIView):
    """Get or update the current user's dashboard preferences."""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        pref, _ = DashboardPreference.objects.get_or_create(user=request.user)
        serializer = DashboardPreferenceSerializer(pref)
        return Response(serializer.data["data"], status=status.HTTP_200_OK)

    def put(self, request):
        pref, _ = DashboardPreference.objects.get_or_create(user=request.user)
        serializer = DashboardPreferenceSerializer(
            instance=pref,
            data={"data": request.data},
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data["data"], status=status.HTTP_200_OK)
