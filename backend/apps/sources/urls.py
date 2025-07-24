from django.urls import path

from .views import (
    SourceDetailView,
    SourceListCreateView,
    YouTubeChannelStatsView,
)

urlpatterns = [
    path("", SourceListCreateView.as_view(), name="source-list"),
    path("<int:pk>/", SourceDetailView.as_view(), name="source-detail"),
    path(
        "<int:pk>/youtube-channel-stats/",
        YouTubeChannelStatsView.as_view(),
        name="source-youtube-channel-stats",
    ),
]
