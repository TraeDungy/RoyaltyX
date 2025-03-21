import uuid

from django.contrib.auth import get_user_model
from django.db import models

from common.models import BaseModel

User = get_user_model()


class Conversation(BaseModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    participants = models.ManyToManyField(User, related_name="conversations")


class Message(BaseModel):
    conversation = models.ForeignKey(
        Conversation, on_delete=models.CASCADE, related_name="messages"
    )
    sent_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="messages")
    text = models.TextField()
