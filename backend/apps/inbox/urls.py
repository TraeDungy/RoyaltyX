from django.urls import path

from .views import (
    ConversationDetailView,
    ConversationListCreateView,
    MessageListCreateView,
)

urlpatterns = [
    path(
        "conversations/",
        ConversationListCreateView.as_view(),
        name="conversations-list-create",
    ),
    path(
        "conversations/<str:conversation_id>/messages/",
        MessageListCreateView.as_view(),
        name="messages-list-create",
    ),
    path(
        "conversations/<str:conversation_id>/",
        ConversationDetailView.as_view(),
        name="messages-list-create",
    ),
]
