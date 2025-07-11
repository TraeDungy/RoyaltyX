from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import User
from .serializers import UserSerializer, SubscriptionPlanSerializer


@api_view(["GET"])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def getMyUserInfo(request):
    user = request.user
    serializer = UserSerializer(user, many=False, context={"request": request})

    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_subscription_plan(request):
    """Get the current user's subscription plan"""
    user = request.user
    serializer = SubscriptionPlanSerializer(user)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def change_subscription_plan(request):
    """Change the current user's subscription plan"""
    user = request.user
    serializer = SubscriptionPlanSerializer(user, data=request.data, partial=True)
    
    if serializer.is_valid():
        # Validate that the subscription plan is one of the allowed choices
        new_plan = serializer.validated_data.get('subscription_plan')
        valid_plans = [choice[0] for choice in User.SUBSCRIPTION_PLAN_CHOICES]
        
        if new_plan not in valid_plans:
            return Response(
                {"error": f"Invalid subscription plan. Valid options are: {', '.join(valid_plans)}"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        serializer.save()
        return Response({
            "message": f"Subscription plan successfully changed to {new_plan}",
            "subscription_plan": new_plan
        })
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_available_plans(request):
    """Get all available subscription plans"""
    plans = [{"value": choice[0], "label": choice[1]} for choice in User.SUBSCRIPTION_PLAN_CHOICES]
    return Response({"plans": plans})
