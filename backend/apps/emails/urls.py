from django.urls import path

from apps.emails import views

urlpatterns = [
    path("templates/", views.EmailTemplateListCreateView.as_view(), name="emailtemplate-list"),
    path("templates/<int:pk>/", views.EmailTemplateDetailView.as_view(), name="emailtemplate-detail"),
]
