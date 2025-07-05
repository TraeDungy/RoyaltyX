from django.urls import path
from . import views

urlpatterns = [
    path('dashboard/stats/', views.admin_dashboard_stats, name='admin_dashboard_stats'),
    path('users/', views.users_list, name='users_list'),
    path('users/stats/', views.users_stats, name='users_stats'),
    path('projects/stats/', views.projects_stats, name='projects_stats'),
    path('sources/stats/', views.sources_stats, name='sources_stats'),
]
