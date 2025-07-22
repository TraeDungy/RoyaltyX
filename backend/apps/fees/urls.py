from django.urls import path

from .views import (
    FeeAnalyticsAPIView,
    FeeRuleDetailAPIView,
    FeeRuleListCreateAPIView,
    FeeTypeDetailAPIView,
    FeeTypeListCreateAPIView,
)

urlpatterns = [
    path("types/", FeeTypeListCreateAPIView.as_view(), name="fee-type-list"),
    path("types/<int:type_id>/", FeeTypeDetailAPIView.as_view(), name="fee-type-detail"),
    path("rules/", FeeRuleListCreateAPIView.as_view(), name="fee-rule-list"),
    path("rules/<int:rule_id>/", FeeRuleDetailAPIView.as_view(), name="fee-rule-detail"),
    path("analytics/", FeeAnalyticsAPIView.as_view(), name="fee-analytics"),
]
