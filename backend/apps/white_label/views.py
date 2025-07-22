from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import WhiteLabelConfig
from .serializers import WhiteLabelConfigSerializer


@api_view(["GET", "POST"])
@permission_classes([permissions.IsAuthenticated])
def config(request):
    try:
        config = WhiteLabelConfig.objects.get(user=request.user)
    except WhiteLabelConfig.DoesNotExist:
        if request.method == "GET":
            return Response({}, status=status.HTTP_200_OK)
        config = WhiteLabelConfig(user=request.user)

    if request.method == "GET":
        serializer = WhiteLabelConfigSerializer(config)
        return Response(serializer.data, status=status.HTTP_200_OK)

    serializer = WhiteLabelConfigSerializer(config, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def cost_estimate(request):
    seats = int(request.query_params.get("seats", 1))
    resell_price = float(request.query_params.get("resell_price", 0))
    try:
        config = WhiteLabelConfig.objects.get(user=request.user)
        seat_cost = float(config.seat_cost)
    except WhiteLabelConfig.DoesNotExist:
        seat_cost = 30.0

    monthly_cost = seat_cost * seats
    monthly_revenue = resell_price * seats
    monthly_profit = monthly_revenue - monthly_cost
    yearly_cost = monthly_cost * 12
    yearly_revenue = monthly_revenue * 12
    yearly_profit = monthly_profit * 12

    data = {
        "monthly_cost": monthly_cost,
        "monthly_revenue": monthly_revenue,
        "monthly_profit": monthly_profit,
        "yearly_cost": yearly_cost,
        "yearly_revenue": yearly_revenue,
        "yearly_profit": yearly_profit,
    }

    return Response(data, status=status.HTTP_200_OK)
