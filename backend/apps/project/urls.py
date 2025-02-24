from django.urls import path
from .views import (
    ProjectListCreateView,
    ProjectDetailView,
    ProjectUserListView,
    ProjectUserView,
    MyProjectsView,
    SwitchProjectView,
    updateProject,
)

urlpatterns = [
    path("", ProjectListCreateView.as_view(), name="project-list-create"),
    path("info/", ProjectDetailView.as_view(), name="project-detail"),
    path("update/", updateProject),
    path("users/", ProjectUserListView.as_view(), name="project-user-list"),
    path("users/<int:id>", ProjectUserView.as_view(), name="project-user"),
    path("my-projects/", MyProjectsView.as_view(), name="my-projects"),
    path("switch-project/", SwitchProjectView.as_view(), name="switch-project"),
]
