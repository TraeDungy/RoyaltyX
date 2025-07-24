from django.urls import path

from .views import (
    BannerAdminView,
    BannerView,
    SendSMSUpdateView,
    UserNotificationView,
)

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
    path("banner/", BannerView.as_view(), name="active-banner"),
    path("banner/admin/", BannerAdminView.as_view(), name="admin-banner"),
]
