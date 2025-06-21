from django.urls import path

from .views import (
    SourceDetailView,
    SourceListCreateView,
)

urlpatterns = [
    path("", SourceListCreateView.as_view()),
    path("<int:pk>/", SourceDetailView.as_view()),
]
