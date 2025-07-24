from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Notification
from .serializers import NotificationSerializer
from .tasks import send_sms_task


class UserNotificationView(APIView):
    """
    GET: List notifications
    POST: Mark notifications as read.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        notifications = Notification.objects.filter(user=request.user).order_by(
            "-created_at"
        )
        serializer = NotificationSerializer(notifications, many=True)
        unread_count = notifications.filter(is_read=False).count()

        data = {
            "unread_count": unread_count,
            "notifications": serializer.data,
        }

        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        """
        Mark all unread notifications as read
        """
        Notification.objects.filter(user=request.user, is_read=False).update(
            is_read=True
        )
        return Response(status=status.HTTP_200_OK)


class SendSMSUpdateView(APIView):
    """Send a text message update to the authenticated user."""

    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        if user.subscription_plan != "premium":
            return Response(
                {
                    "detail": (
                        "SMS updates are included in the premium plan or can be "
                        "added to other plans for $10/month"
                    ),
                    "requires_payment": True,
                },
                status=status.HTTP_402_PAYMENT_REQUIRED,
            )

        if not user.phone_number:
            return Response(
                {"error": "No phone number on file"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        message = request.data.get("message")
        if not message:
            return Response(
                {"error": "Message is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        send_sms_task.delay(message, user.phone_number)
        return Response({"message": "SMS queued"}, status=status.HTTP_200_OK)
