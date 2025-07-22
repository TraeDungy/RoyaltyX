from django.urls import path

from apps.analytics.views import (
    AnalyticsExportView,
    AnalyticsForecastView,
    AnalyticsView,
    GenerateAnalyticsForecastView,
)

urlpatterns = [
    path("", AnalyticsView.as_view(), name="project-analytics"),
    path("export/", AnalyticsExportView.as_view(), name="analytics-export"),
    path("forecasts/", AnalyticsForecastView.as_view(), name="analytics-forecasts"),
    path(
        "forecasts/generate/",
        GenerateAnalyticsForecastView.as_view(),
        name="analytics-forecast-generate",
    ),
    path("<int:product_id>/", AnalyticsView.as_view(), name="product-analytics"),
]
