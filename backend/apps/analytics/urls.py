from django.urls import path

from apps.analytics.views import (
    AnalyticsView,
    AnalyticsExportView,
    AnalyticsForecastView,
    AnalyticsReportingView,
)

urlpatterns = [
    path("", AnalyticsView.as_view(), name="project-analytics"),
    path("export/", AnalyticsExportView.as_view(), name="analytics-export"),
    path("forecasts/", AnalyticsForecastView.as_view(), name="analytics-forecasts"),
    path(
        "reporting/",
        AnalyticsReportingView.as_view(),
        name="analytics-reporting",
    ),
    path("<int:product_id>/", AnalyticsView.as_view(), name="product-analytics"),
]
