from django.urls import path

from .views import (
    FeeGroupDetailView,
    FeeGroupListCreateView,
    FeeReportView,
    FeeRuleDetailView,
    FeeRuleListCreateView,
    FeeTypeDetailView,
    FeeTypeListCreateView,
)

urlpatterns = [
    path("types/", FeeTypeListCreateView.as_view(), name="fee-type-list"),
    path("types/<int:pk>/", FeeTypeDetailView.as_view(), name="fee-type-detail"),
    path("groups/", FeeGroupListCreateView.as_view(), name="fee-group-list"),
    path("groups/<int:pk>/", FeeGroupDetailView.as_view(), name="fee-group-detail"),
    path("rules/", FeeRuleListCreateView.as_view(), name="fee-rule-list"),
    path("rules/<int:pk>/", FeeRuleDetailView.as_view(), name="fee-rule-detail"),
    path("report/", FeeReportView.as_view(), name="fee-report"),
]
