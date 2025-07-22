from django.urls import path

from .views import (
    SourceDetailView,
    SourceListCreateView,
    YoutubeAnalyticsView,
)

urlpatterns = [
    path("", SourceListCreateView.as_view()),
    path("<int:pk>/", SourceDetailView.as_view()),
    path("<int:pk>/youtube-analytics/", YoutubeAnalyticsView.as_view()),
]
