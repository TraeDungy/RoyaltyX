from django.urls import path

from .views import EmailTemplateListCreateView, EmailTemplateDetailView

urlpatterns = [
    path("templates/", EmailTemplateListCreateView.as_view(), name="emailtemplate_list_create"),
    path("templates/<int:pk>/", EmailTemplateDetailView.as_view(), name="emailtemplate_detail"),
]
