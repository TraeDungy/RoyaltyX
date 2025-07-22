from datetime import datetime

from django.db.models import Sum
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import AppliedFee, FeeRule, FeeType
from .serializers import FeeRuleSerializer, FeeTypeSerializer


class FeeTypeListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        types = FeeType.objects.all()
        serializer = FeeTypeSerializer(types, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = FeeTypeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FeeTypeDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, type_id):
        try:
            return FeeType.objects.get(id=type_id)
        except FeeType.DoesNotExist:
            return None

    def get(self, request, type_id):
        obj = self.get_object(type_id)
        if not obj:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = FeeTypeSerializer(obj)
        return Response(serializer.data)

    def put(self, request, type_id):
        obj = self.get_object(type_id)
        if not obj:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = FeeTypeSerializer(obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, type_id):
        obj = self.get_object(type_id)
        if not obj:
            return Response(status=status.HTTP_404_NOT_FOUND)
        obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class FeeRuleListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        project_id = request.user.currently_selected_project_id
        rules = FeeRule.objects.filter(project_id=project_id)
        serializer = FeeRuleSerializer(rules, many=True)
        return Response(serializer.data)

    def post(self, request):
        project_id = request.user.currently_selected_project_id
        data = request.data.copy()
        data["project"] = project_id
        serializer = FeeRuleSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FeeRuleDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, rule_id):
        try:
            return FeeRule.objects.get(id=rule_id)
        except FeeRule.DoesNotExist:
            return None

    def get(self, request, rule_id):
        rule = self.get_object(rule_id)
        if not rule:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = FeeRuleSerializer(rule)
        return Response(serializer.data)

    def put(self, request, rule_id):
        rule = self.get_object(rule_id)
        if not rule:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = FeeRuleSerializer(rule, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, rule_id):
        rule = self.get_object(rule_id)
        if not rule:
            return Response(status=status.HTTP_404_NOT_FOUND)
        rule.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class FeeAnalyticsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        project_id = request.user.currently_selected_project_id
        start_str = request.query_params.get("period_start")
        end_str = request.query_params.get("period_end")
        filters = {"sale__product__project_id": project_id}

        if start_str and end_str:
            try:
                start = datetime.fromisoformat(start_str)
                end = datetime.fromisoformat(end_str)
                filters["sale__period_start__gte"] = start
                filters["sale__period_end__lte"] = end
            except ValueError:
                return Response(
                    {"error": "Invalid date format"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        qs = (
            AppliedFee.objects.filter(**filters)
            .values("fee_type__name")
            .annotate(total=Sum("amount"))
        )
        data = {entry["fee_type__name"]: entry["total"] for entry in qs}
        return Response(data)
