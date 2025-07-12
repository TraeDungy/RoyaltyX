from django.urls import path

from .views import (
    get_users, 
    getMyUserInfo, 
    get_subscription_plan, 
    change_subscription_plan, 
    get_available_plans
)

urlpatterns = [
    path("", get_users, name="user.get_users"),
    path("get-my-info/", getMyUserInfo, name="user.getMyUserInfo"),
    path("subscription-plan/", get_subscription_plan, name="user.get_subscription_plan"),
    path("subscription-plan/change/", change_subscription_plan, name="user.change_subscription_plan"),
    path("subscription-plan/available/", get_available_plans, name="user.get_available_plans"),
]
