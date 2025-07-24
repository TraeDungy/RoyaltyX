from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()

class UserRegistrationSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=150, required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True, min_length=8)
    role = serializers.ChoiceField(
        choices=User.ROLE_CHOICES, required=False, default="user"
    )

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email is already registered.")
        return value

    def create(self, validated_data):
        role = validated_data.pop("role", "user")
        user = User.objects.create_user(
            email=validated_data["email"],
            name=validated_data["name"],
            password=validated_data["password"],
        )
        user.role = role
        user.save()
        if role == "admin":
            from apps.user.models import Permission, Role

            perm, _ = Permission.objects.get_or_create(
                code="admin_access",
                defaults={"description": "Access admin panel"},
            )
            admin_role, _ = Role.objects.get_or_create(
                name="Admin",
                defaults={"description": "Administrators"},
            )
            admin_role.permissions.add(perm)
            user.roles.add(admin_role)
        return user
