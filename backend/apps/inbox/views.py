from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Conversation, Message
from .serializers import ConversationSerializer, MessageSerializer


class ConversationListCreateView(APIView):
    """
    GET: List conversations of the logged-in user
    POST: Create a new conversation with participants
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        conversations = (
            request.user.conversations.all()
        )  # Fetch conversations where user is a participant
        serializer = ConversationSerializer(conversations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        participants = request.data.get("participants", [])
        if request.user.id not in participants:
            participants.append(
                request.user.id
            )  # Ensure logged-in user is part of the conversation

        conversation = Conversation.objects.create()
        conversation.participants.set(participants)

        serializer = ConversationSerializer(conversation)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ConversationDetailView(APIView):
    """
    GET: Retrieve details of a specific conversation
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, conversation_id):
        conversation = get_object_or_404(
            Conversation, id=conversation_id, participants=request.user
        )
        serializer = ConversationSerializer(conversation)
        return Response(serializer.data, status=status.HTTP_200_OK)


class MessageListCreateView(APIView):
    """
    GET: List messages in a conversation (only for participants)
    POST: Send a message in a conversation
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, conversation_id):
        conversation = get_object_or_404(Conversation, id=conversation_id)
        if request.user not in conversation.participants.all():
            return Response(
                {"error": "Not authorized"}, status=status.HTTP_403_FORBIDDEN
            )

        messages = conversation.messages.all().order_by("created_at")
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, conversation_id):
        conversation = get_object_or_404(Conversation, id=conversation_id)
        if request.user not in conversation.participants.all():
            return Response(
                {"error": "Not authorized"}, status=status.HTTP_403_FORBIDDEN
            )

        data = request.data.copy()
        data["conversation"] = conversation.id
        data["sent_by"] = request.user.id

        serializer = MessageSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
