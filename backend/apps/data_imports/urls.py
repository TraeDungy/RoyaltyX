from django.urls import path

from .views import (
    DatasetDetailView,
    FileDetailView,
    FileListCreateView,
    ProducerListCreateView,
)

urlpatterns = [
    path("files/", FileListCreateView.as_view(), name="file-list-create"),
    path("files/<int:pk>/", FileDetailView.as_view(), name="file-detail"),
    path("producers/", ProducerListCreateView.as_view(), name="producer-list-create"),
    path("datasets/<int:pk>/", DatasetDetailView.as_view(), name="dataset-detail"),
]
