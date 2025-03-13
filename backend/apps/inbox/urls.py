from django.urls import path

from .views import ConversationListCreateView, MessageDetailView, MessageListCreateView

urlpatterns = [
    path(
        "conversations/",
        ConversationListCreateView.as_view(),
        name="conversations-list-create",
    ),
    path(
        "conversations/<int:conversation_id>/messages/",
        MessageListCreateView.as_view(),
        name="messages-list-create",
    ),
    path(
        "messages/<int:message_id>/", MessageDetailView.as_view(), name="message-detail"
    ),
]
