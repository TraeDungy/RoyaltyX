from rest_framework import serializers
import bleach

from .models import Conversation, Message


class ConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversation
        fields = "__all__"
        depth = 1


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"

    def validate_text(self, value):
        return bleach.clean(value)
