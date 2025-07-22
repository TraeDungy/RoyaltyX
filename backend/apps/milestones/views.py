from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Milestone
from .serializers import MilestoneSerializer


class MilestoneListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        milestones = Milestone.objects.filter(
            user=request.user,
            project_id=request.user.currently_selected_project_id,
        ).order_by("-created_at")
        serializer = MilestoneSerializer(milestones, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data.copy()
        data["user"] = request.user.id
        data["project"] = request.user.currently_selected_project_id
        serializer = MilestoneSerializer(data=data)
        if serializer.is_valid():
            milestone = serializer.save()
            return Response(MilestoneSerializer(milestone).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MilestoneDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        try:
            milestone = Milestone.objects.get(
                pk=pk,
                user=request.user,
                project_id=request.user.currently_selected_project_id,
            )
        except Milestone.DoesNotExist:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = MilestoneSerializer(milestone, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
