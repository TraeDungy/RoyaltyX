from django.urls import path

from .views import PerformanceMilestoneListCreateView

urlpatterns = [
    path("", PerformanceMilestoneListCreateView.as_view(), name="milestone-list-create"),
]
