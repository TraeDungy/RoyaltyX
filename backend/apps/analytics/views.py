from datetime import datetime, time
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from apps.analytics.serializers import AnalyticsSerializer
from apps.analytics.utils import calculate_analytics


class AnalyticsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, product_id=None):
        serializer = AnalyticsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        project_id = request.user.currently_selected_project_id
        period_start = serializer.validated_data.get('period_start', None)
        period_end = serializer.validated_data.get('period_end', None)

        filters = {}
        months = 12

        if period_start and period_end:
            start_date = datetime.combine(period_start, time.min)
            end_date = datetime.combine(period_end, time.max)
            filters["period_start__gte"] = start_date
            filters["period_end__lte"] = end_date
            months = (
                (end_date.year - start_date.year) * 12
                + (end_date.month - start_date.month)
                + 1
            )

        data = calculate_analytics(project_id, filters, months, product_id)
        
        return Response(data, status=status.HTTP_200_OK)
