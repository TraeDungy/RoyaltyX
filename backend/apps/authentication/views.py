from django.contrib.auth.hashers import check_password
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.authentication.serializer import UserRegistrationSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


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
            return Response(
                {"user": {"email": user.email, "name": user.name}},
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
