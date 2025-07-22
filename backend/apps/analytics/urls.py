from django.urls import path

from apps.analytics.views import AnalyticsForecastView, AnalyticsView

urlpatterns = [
    path("", AnalyticsView.as_view(), name="project-analytics"),
    path("<int:product_id>/", AnalyticsView.as_view(), name="product-analytics"),
    path("forecasts/", AnalyticsForecastView.as_view(), name="analytics-forecasts"),
]
