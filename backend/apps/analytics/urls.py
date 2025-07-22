from django.urls import path

from apps.analytics.views import AnalyticsView, AnalyticsExportView

urlpatterns = [
    path("", AnalyticsView.as_view(), name="project-analytics"),
    path("export/", AnalyticsExportView.as_view(), name="analytics-export"),
    path("<int:product_id>/", AnalyticsView.as_view(), name="product-analytics"),
]
