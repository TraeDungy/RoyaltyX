from django.urls import path

from .views import (
    EmailTemplateDetailView,
    EmailTemplateListCreateView,
    GenerateEmailTemplateView,
)

urlpatterns = [
    path(
        "templates/",
        EmailTemplateListCreateView.as_view(),
        name="emailtemplate-list-create",
    ),
    path(
        "templates/<int:pk>/",
        EmailTemplateDetailView.as_view(),
        name="emailtemplate-detail",
    ),
    path(
        "templates/generate/",
        GenerateEmailTemplateView.as_view(),
        name="emailtemplate-generate",
    ),
]
