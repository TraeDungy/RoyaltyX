from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Stock, StockPrice
from .serializers import StockSerializer, StockPriceSerializer
from .utils.stock_service import update_all_stock_prices


class StockListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        stocks = Stock.objects.filter(project_id=request.user.currently_selected_project_id)
        serializer = StockSerializer(stocks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data.copy()
        data["project"] = request.user.currently_selected_project_id
        serializer = StockSerializer(data=data)
        if serializer.is_valid():
            stock = serializer.save()
            update_all_stock_prices(stock.id)
            return Response(StockSerializer(stock).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StockPriceListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, stock_id):
        try:
            stock = Stock.objects.get(id=stock_id, project_id=request.user.currently_selected_project_id)
        except Stock.DoesNotExist:
            return Response({"detail": "Stock not found"}, status=status.HTTP_404_NOT_FOUND)
        prices = StockPrice.objects.filter(stock=stock).order_by("date")
        serializer = StockPriceSerializer(prices, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
