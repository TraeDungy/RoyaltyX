from django.urls import path

from .views import AffiliateReferralListView, AffiliateSignupView

urlpatterns = [
    path("signup/", AffiliateSignupView.as_view(), name="affiliate.signup"),
    path("referrals/", AffiliateReferralListView.as_view(), name="affiliate.referrals"),
]
