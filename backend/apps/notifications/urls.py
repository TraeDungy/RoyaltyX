from django.urls import path

from .views import BannerAdminView, BannerView, UserNotificationView

urlpatterns = [
    path(
        "",
        UserNotificationView.as_view(),
        name="notifications-list-update",
    ),
    path("banner/", BannerView.as_view(), name="active-banner"),
    path("banner/admin/", BannerAdminView.as_view(), name="admin-banner"),
]
