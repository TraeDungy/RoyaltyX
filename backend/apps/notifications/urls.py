from django.urls import path

from .views import SendSMSUpdateView, UserNotificationView

urlpatterns = [
    path(
        "",
        UserNotificationView.as_view(),
        name="notifications-list-update",
    ),
    path(
        "sms/",
        SendSMSUpdateView.as_view(),
        name="notifications-send-sms",
    ),
]
