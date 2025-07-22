from django.urls import path

from .views import UserNotificationView, NotificationPreferenceView

urlpatterns = [
    path(
        "",
        UserNotificationView.as_view(),
        name="notifications-list-update",
    ),
    path(
        "preferences/",
        NotificationPreferenceView.as_view(),
        name="notification-preferences",
    ),
]
