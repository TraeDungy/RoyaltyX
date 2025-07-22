from django.db.models import Sum
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import FeeAdjustment, FeeRule, FeeType
from .serializers import FeeRuleSerializer, FeeTypeSerializer


class FeeTypeListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        fee_types = FeeType.objects.all()
        serializer = FeeTypeSerializer(fee_types, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = FeeTypeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FeeTypeDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        return FeeType.objects.get(pk=pk)

    def get(self, request, pk):
        fee_type = self.get_object(pk)
        serializer = FeeTypeSerializer(fee_type)
        return Response(serializer.data)

    def put(self, request, pk):
        fee_type = self.get_object(pk)
        serializer = FeeTypeSerializer(fee_type, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        fee_type = self.get_object(pk)
        fee_type.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class FeeRuleListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        rules = FeeRule.objects.filter(
            project_id=request.user.currently_selected_project_id
        )
        serializer = FeeRuleSerializer(rules, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data.copy()
        data["project"] = request.user.currently_selected_project_id
        serializer = FeeRuleSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FeeRuleDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        return FeeRule.objects.get(
            pk=pk, project_id=self.request.user.currently_selected_project_id
        )

    def get(self, request, pk):
        rule = self.get_object(pk)
        serializer = FeeRuleSerializer(rule)
        return Response(serializer.data)

    def put(self, request, pk):
        rule = self.get_object(pk)
        serializer = FeeRuleSerializer(rule, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        rule = self.get_object(pk)
        rule.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class FeeReportView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        project_id = request.user.currently_selected_project_id
        adjustments = FeeAdjustment.objects.filter(rule__project_id=project_id)
        summary = (
            adjustments.values("rule__fee_type__name")
            .annotate(total=Sum("amount"))
            .order_by("rule__fee_type__name")
        )
        return Response(list(summary))
