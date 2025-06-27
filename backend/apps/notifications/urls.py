from django.urls import path

from .views import UserNotificationView

urlpatterns = [
    path(
        "",
        UserNotificationView.as_view(),
        name="notifications-list-update",
    ),
]
