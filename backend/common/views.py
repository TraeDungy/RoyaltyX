from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .models import TaskStatus
from .serializers import TaskStatusSerializer


class TaskStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, task_id):
        try:
            task_status = TaskStatus.objects.get(celery_id=task_id)
        except TaskStatus.DoesNotExist:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = TaskStatusSerializer(task_status)
        return Response(serializer.data)
