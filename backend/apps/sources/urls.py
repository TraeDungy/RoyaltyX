from django.urls import path

from .views import (
    SourceListCreateView,
)

urlpatterns = [
    path("", SourceListCreateView.as_view()),
]
