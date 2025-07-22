from django.urls import path

from .views import (
    FileDetailView,
    FileListCreateView,
    ProducerListCreateView,
    DatasetDetailView,
)

urlpatterns = [
    path("files/", FileListCreateView.as_view(), name="file-list-create"),
    path("files/<int:pk>/", FileDetailView.as_view(), name="file-detail"),
    path("producers/", ProducerListCreateView.as_view(), name="producer-list-create"),
    path("datasets/<int:pk>/", DatasetDetailView.as_view(), name="dataset-detail"),
]
