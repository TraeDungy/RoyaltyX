from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.admin_panel.views import has_admin_access

from .models import Banner, Notification
from .serializers import BannerSerializer, NotificationSerializer
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
        has_sms_addon = user.add_ons.filter(code="sms").exists()
        if user.subscription_plan != "premium" and not has_sms_addon:
            return Response(
                {
                    "detail": (
                        "SMS updates are included in the premium plan or can be "
                        "added to other plans for $15/month"
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


class BannerView(APIView):
    """Return the currently active banner for dashboards."""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        banner = Banner.objects.filter(is_active=True).order_by("-created_at").first()
        if not banner:
            return Response(status=status.HTTP_204_NO_CONTENT)
        data = BannerSerializer(banner).data
        return Response(data, status=status.HTTP_200_OK)


class BannerAdminView(APIView):
    """Create or update banners (admin only)."""

    permission_classes = [IsAuthenticated]

    def post(self, request):
        if not has_admin_access(request.user):
            return Response(
                {"error": "You do not have permission to perform this action."},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = BannerSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if serializer.validated_data.get("is_active"):
            Banner.objects.filter(is_active=True).update(is_active=False)
        banner = serializer.save()
        return Response(BannerSerializer(banner).data, status=status.HTTP_201_CREATED)
