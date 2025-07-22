from django.urls import path

from .views import EmailTemplateListCreateView, EmailTemplateDetailView

urlpatterns = [
    path("templates/", EmailTemplateListCreateView.as_view(), name="emailtemplate-list-create"),
    path("templates/<int:pk>/", EmailTemplateDetailView.as_view(), name="emailtemplate-detail"),
]
