from django.urls import path

from apps.analytics.views import AnalyticsView


urlpatterns = [
    path("", AnalyticsView.as_view(), name="project-analytics"),
    path("<int:product_id>/", AnalyticsView.as_view(), name="product-analytics"),
]
