from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import PerformanceMilestone
from .serializers import PerformanceMilestoneSerializer


class PerformanceMilestoneListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        milestones = PerformanceMilestone.objects.filter(user=request.user)
        serializer = PerformanceMilestoneSerializer(milestones, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data.copy()
        data["user"] = request.user.id
        serializer = PerformanceMilestoneSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
