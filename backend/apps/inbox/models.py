from django.contrib.auth import get_user_model
from django.db import models

from common.models import BaseModel

User = get_user_model()


class Conversation(BaseModel):
    participants = models.ManyToManyField(User, related_name="conversations")

    def __str__(self):
        return f"Conversation {self.id} ({self.participants.count()} participants)"


class Message(BaseModel):
    conversation = models.ForeignKey(
        Conversation, on_delete=models.CASCADE, related_name="messages"
    )
    sent_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="messages")
    text = models.TextField()

    def __str__(self):
        return f"Message {self.id} by {self.sent_by.username}"
