from django.urls import path
from .views import (
    ProjectListCreateView, 
    ProjectDetailView, 
    ProjectUserListCreateView, 
    MyProjectsView,
    SwitchProjectView
)

urlpatterns = [
    path('', ProjectListCreateView.as_view(), name='project-list-create'),  # List all projects or create a new one
    path('<int:pk>/', ProjectDetailView.as_view(), name='project-detail'),  # Retrieve, update, or delete a project
    path('users/', ProjectUserListCreateView.as_view(), name='project-user-list-create'),  # List/create project users
    path('my-projects/', MyProjectsView.as_view(), name='my-projects'),  # List projects owned by the current user
    path('switch-project/', SwitchProjectView.as_view(), name='switch-project'),  # Endpoint for switching projects
]
