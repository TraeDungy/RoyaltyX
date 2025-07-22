from django.contrib.auth.hashers import check_password
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from apps.authentication.serializer import UserRegistrationSerializer
from apps.emails.utils import send_welcome_email


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["id"] = user.id
        token["email"] = user.email
        token["username"] = user.username
        token["name"] = user.name
        token["avatar"] = user.avatar
        token["role"] = user.role
        token["subscription_plan"] = user.subscription_plan
        token["currently_selected_project_id"] = user.currently_selected_project_id

        return token


class RegisterView(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # Track referral if a code was provided
            referral_code = request.data.get("referral_code") or request.query_params.get("ref")
            if referral_code:
                try:
                    from apps.affiliate.models import Affiliate, AffiliateReferral

                    affiliate = Affiliate.objects.get(referral_code=referral_code)
                    AffiliateReferral.objects.create(
                        affiliate=affiliate,
                        referred_user=user,
                    )
                except Affiliate.DoesNotExist:
                    pass
            
            # Send welcome email to the new user
            try:
                send_welcome_email(
                    user_email=user.email,
                    user_name=user.name or user.username
                )
            except Exception as e:
                print(e, flush=True)
            
            # Generate JWT tokens for the newly created user
            token_serializer = MyTokenObtainPairSerializer()
            token = token_serializer.get_token(user)
            
            return Response(
                {
                    "user": {"email": user.email, "name": user.name},
                    "access": str(token.access_token),
                    "refresh": str(token)
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        data = request.data

        current_password = data.get("current_password")
        new_password = data.get("new_password")
        confirm_password = data.get("confirm_password")

        if not current_password or not new_password or not confirm_password:
            return Response(
                {"error": "All fields are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not check_password(current_password, user.password):
            return Response(
                {"error": "Current password is incorrect."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if new_password != confirm_password:
            return Response(
                {"error": "New password and confirm password do not match."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.set_password(new_password)
        user.save()

        return Response(
            {"message": "Password changed successfully."}, status=status.HTTP_200_OK
        )
