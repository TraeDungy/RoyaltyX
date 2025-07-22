from datetime import datetime, time

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
import csv
from io import StringIO

from apps.analytics.serializers import AnalyticsSerializer
from apps.analytics.utils import calculate_analytics


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
    permission_classes = [IsAuthenticated]

    def _determine_granularity(self, period_start, period_end):
        if not period_start or not period_end:
            return "monthly"

        delta = period_end - period_start

        if delta.days <= 1:
            return "hourly"
        elif delta.days <= 31:
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

        output = StringIO()
        fieldnames = [
            "period",
            "impressions",
            "sales",
            "rentals",
            "royalty_revenue",
            "impression_revenue",
        ]
        writer = csv.DictWriter(output, fieldnames=fieldnames)
        writer.writeheader()
        for row in data.get("time_stats", []):
            writer.writerow(
                {
                    "period": row.get("period")
                    or row.get("month")
                    or row.get("year"),
                    "impressions": row.get("impressions", 0),
                    "sales": row.get("sales", 0),
                    "rentals": row.get("rentals", 0),
                    "royalty_revenue": row.get("royalty_revenue", 0),
                    "impression_revenue": row.get("impression_revenue", 0),
                }
            )

        response = Response(output.getvalue(), content_type="text/csv")
        response["Content-Disposition"] = "attachment; filename=analytics.csv"
        return response
