import csv
from datetime import datetime, time

import openai
from django.conf import settings
from django.db.models import Sum
from django.http import HttpResponse
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.analytics.models import AnalyticsForecast, AnalyticsRecord
from apps.analytics.serializers import (
    AnalyticsForecastSerializer,
    AnalyticsSerializer,
)
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


class GenerateAnalyticsForecastView(APIView):
    """Generate a new analytics forecast using OpenAI."""

    permission_classes = [IsAuthenticated]

    def post(self, request):
        project_id = request.user.currently_selected_project_id
        product_id = request.data.get("product_id")

        if not settings.OPENAI_API_KEY:
            return Response(
                {"error": "OpenAI API key is not configured."},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        # Simple summary of totals to provide context for the forecast
        filters = {"project_id": project_id}
        if product_id:
            filters["product_id"] = product_id

        records = AnalyticsRecord.objects.filter(**filters)
        totals = records.aggregate(
            total_sales=Sum("sales"), total_revenue=Sum("royalty_revenue")
        )
        total_sales = totals.get("total_sales") or 0
        total_revenue = totals.get("total_revenue") or 0

        prompt = (
            "Provide a short forecast for the next quarter based on "
            f"total sales {total_sales} and revenue {total_revenue:.2f}."
        )

        try:  # pragma: no cover - network call
            completion = openai.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
            )
            forecast_text = completion.choices[0].message.content.strip()
        except Exception as exc:  # pragma: no cover - network call
            return Response(
                {"error": f"OpenAI request failed: {exc}"},
                status=status.HTTP_502_BAD_GATEWAY,
            )

        forecast = AnalyticsForecast.objects.create(
            project_id=project_id,
            product_id=product_id,
            forecast=forecast_text,
        )
        serializer = AnalyticsForecastSerializer(forecast)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
