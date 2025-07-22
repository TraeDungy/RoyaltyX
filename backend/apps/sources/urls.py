from django.urls import path

from .views import (
    SourceDetailView,
    SourceListCreateView,
    TokenStatusListView,
)

urlpatterns = [
    path("", SourceListCreateView.as_view()),
    path("<int:pk>/", SourceDetailView.as_view()),
    path("token-status/", TokenStatusListView.as_view()),
]
