from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import SupportAttachment, SupportMessage, SupportTicket

User = get_user_model()


class UserBasicSerializer(serializers.ModelSerializer):
    """Basic user info for support system"""

    class Meta:
        model = User
        fields = ["id", "name", "email", "avatar", "is_staff"]


class SupportAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupportAttachment
        fields = ["id", "filename", "file", "file_size", "created_at"]


class SupportMessageSerializer(serializers.ModelSerializer):
    sender = UserBasicSerializer(read_only=True)
    attachments = SupportAttachmentSerializer(many=True, read_only=True)

    class Meta:
        model = SupportMessage
        fields = [
            "id",
            "sender",
            "message_type",
            "content",
            "is_internal_note",
            "attachments",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["message_type", "created_at", "updated_at"]


class SupportTicketListSerializer(serializers.ModelSerializer):
    """Serializer for ticket list view"""

    customer = UserBasicSerializer(read_only=True)
    assigned_admin = UserBasicSerializer(read_only=True)
    last_message = serializers.SerializerMethodField()
    unread_count = serializers.SerializerMethodField()

    class Meta:
        model = SupportTicket
        fields = [
            "id",
            "ticket_number",
            "subject",
            "customer",
            "assigned_admin",
            "status",
            "priority",
            "last_message",
            "unread_count",
            "first_response_at",
            "resolved_at",
            "created_at",
            "updated_at",
        ]

    def get_last_message(self, obj):
        last_message = obj.messages.filter(is_internal_note=False).last()
        if last_message:
            return {
                "content": last_message.content[:100] + "..."
                if len(last_message.content) > 100
                else last_message.content,
                "sender_name": last_message.sender.name,
                "created_at": last_message.created_at,
                "message_type": last_message.message_type,
            }
        return None

    def get_unread_count(self, obj):
        # For now, return 0. Can be implemented with read status tracking
        return 0


class SupportTicketDetailSerializer(serializers.ModelSerializer):
    """Serializer for detailed ticket view"""

    customer = UserBasicSerializer(read_only=True)
    assigned_admin = UserBasicSerializer(read_only=True)
    messages = SupportMessageSerializer(many=True, read_only=True)

    class Meta:
        model = SupportTicket
        fields = [
            "id",
            "ticket_number",
            "subject",
            "customer",
            "assigned_admin",
            "status",
            "priority",
            "messages",
            "first_response_at",
            "resolved_at",
            "created_at",
            "updated_at",
        ]


class CreateSupportTicketSerializer(serializers.ModelSerializer):
    """Serializer for creating new support tickets"""

    initial_message = serializers.CharField(write_only=True)

    class Meta:
        model = SupportTicket
        fields = ["subject", "priority", "initial_message"]

    def create(self, validated_data):
        initial_message = validated_data.pop("initial_message")
        customer = self.context["request"].user

        # Create the ticket
        ticket = SupportTicket.objects.create(customer=customer, **validated_data)

        # Create the initial message
        SupportMessage.objects.create(
            ticket=ticket,
            sender=customer,
            content=initial_message,
            message_type="customer",
        )

        return ticket


class CreateSupportMessageSerializer(serializers.ModelSerializer):
    """Serializer for creating new messages in a ticket"""

    class Meta:
        model = SupportMessage
        fields = ["content", "is_internal_note"]

    def create(self, validated_data):
        ticket = self.context["ticket"]
        sender = self.context["request"].user

        message = SupportMessage.objects.create(
            ticket=ticket, sender=sender, **validated_data
        )

        # Update ticket status if needed
        if message.message_type == "customer" and ticket.status == "resolved":
            ticket.status = "open"
            ticket.save()
        elif message.message_type == "admin" and ticket.status == "open":
            ticket.status = "in_progress"
            if not ticket.assigned_admin:
                ticket.assigned_admin = sender
            ticket.save()

        return message


class UpdateTicketStatusSerializer(serializers.ModelSerializer):
    """Serializer for updating ticket status and assignment"""

    class Meta:
        model = SupportTicket
        fields = ["status", "priority", "assigned_admin"]

    def update(self, instance, validated_data):
        # Set resolved_at when status changes to resolved
        if validated_data.get("status") == "resolved" and instance.status != "resolved":
            from django.utils import timezone

            validated_data["resolved_at"] = timezone.now()

        return super().update(instance, validated_data)


class HelpChatSerializer(serializers.Serializer):
    """Serializer for OpenAI help chat requests."""

    question = serializers.CharField(max_length=500)
