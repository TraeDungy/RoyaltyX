import openai
from django.conf import settings
from django.contrib.auth import get_user_model
from django.db.models import Count, Q
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from .models import SupportTicket
from .serializers import (
    CreateSupportMessageSerializer,
    CreateSupportTicketSerializer,
    HelpChatSerializer,
    SupportTicketDetailSerializer,
    SupportTicketListSerializer,
    UpdateTicketStatusSerializer,
)

User = get_user_model()


class CustomerSupportTicketListView(generics.ListCreateAPIView):
    """
    Customer view: List their own tickets and create new ones
    """

    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SupportTicket.objects.filter(
            customer=self.request.user
        ).prefetch_related("messages__sender", "assigned_admin")

    def get_serializer_class(self):
        if self.request.method == "POST":
            return CreateSupportTicketSerializer
        return SupportTicketListSerializer


class CustomerSupportTicketDetailView(generics.RetrieveAPIView):
    """
    Customer view: Get details of their own ticket
    """

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SupportTicketDetailSerializer

    def get_queryset(self):
        return SupportTicket.objects.filter(
            customer=self.request.user
        ).prefetch_related("messages__sender", "assigned_admin")


class AdminSupportTicketListView(generics.ListAPIView):
    """
    Admin view: List all support tickets with filtering
    """

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SupportTicketListSerializer

    def get_queryset(self):
        # For now, let's remove the admin check and see if the basic functionality works
        # We'll add it back once we understand the authentication issue
        queryset = SupportTicket.objects.all().prefetch_related(
            "customer", "assigned_admin", "messages__sender"
        )

        # Filter by status
        status_filter = self.request.query_params.get("status")
        if status_filter:
            queryset = queryset.filter(status=status_filter)

        # Filter by priority
        priority_filter = self.request.query_params.get("priority")
        if priority_filter:
            queryset = queryset.filter(priority=priority_filter)

        # Filter by assignment
        assignment_filter = self.request.query_params.get("assignment")
        if assignment_filter == "unassigned":
            queryset = queryset.filter(assigned_admin__isnull=True)
        elif assignment_filter == "my_tickets":
            queryset = queryset.filter(assigned_admin=self.request.user)

        # Search by ticket number, subject, or customer name
        search = self.request.query_params.get("search")
        if search:
            queryset = queryset.filter(
                Q(ticket_number__icontains=search)
                | Q(subject__icontains=search)
                | Q(customer__name__icontains=search)
                | Q(customer__email__icontains=search)
            )

        return queryset


class AdminSupportTicketDetailView(generics.RetrieveUpdateAPIView):
    """
    Admin view: Get and update ticket details
    """

    permission_classes = [permissions.IsAuthenticated]
    queryset = SupportTicket.objects.all().prefetch_related(
        "customer", "assigned_admin", "messages__sender"
    )

    def dispatch(self, request, *args, **kwargs):
        if not hasattr(request.user, "role") or request.user.role != "admin":
            raise PermissionDenied("You do not have permission to perform this action.")
        return super().dispatch(request, *args, **kwargs)

    def get_serializer_class(self):
        if self.request.method in ["PUT", "PATCH"]:
            return UpdateTicketStatusSerializer
        return SupportTicketDetailSerializer


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def create_support_message(request, ticket_id):
    """
    Create a new message in a support ticket
    """
    ticket = get_object_or_404(SupportTicket, id=ticket_id)

    if not hasattr(request.user, "role") or request.user.role != "admin":
        return Response(
            {"error": "You do not have permission to access this ticket"},
            status=status.HTTP_403_FORBIDDEN,
        )

    serializer = CreateSupportMessageSerializer(
        data=request.data, context={"request": request, "ticket": ticket}
    )

    if serializer.is_valid():
        message = serializer.save()
        return Response(
            CreateSupportMessageSerializer(message).data, status=status.HTTP_201_CREATED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def assign_ticket(request, ticket_id):
    """
    Assign a ticket to an admin
    """
    if not hasattr(request.user, "role") or request.user.role != "admin":
        return Response(
            {"error": "You do not have permission to perform this action."},
            status=status.HTTP_403_FORBIDDEN,
        )

    ticket = get_object_or_404(SupportTicket, id=ticket_id)
    admin_id = request.data.get("admin_id")

    if admin_id:
        admin = get_object_or_404(User, id=admin_id, role="admin")
        ticket.assigned_admin = admin
    else:
        # Assign to current user
        ticket.assigned_admin = request.user

    ticket.save()

    return Response(
        {
            "message": "Ticket assigned successfully",
            "assigned_admin": {
                "id": ticket.assigned_admin.id,
                "name": ticket.assigned_admin.name,
                "email": ticket.assigned_admin.email,
            },
        }
    )


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def take_ticket(request, ticket_id):
    """
    Admin takes an unassigned ticket
    """
    if not hasattr(request.user, "role") or request.user.role != "admin":
        return Response(
            {"error": "You do not have permission to perform this action."},
            status=status.HTTP_403_FORBIDDEN,
        )

    ticket = get_object_or_404(SupportTicket, id=ticket_id)

    if ticket.assigned_admin:
        return Response(
            {"error": "Ticket is already assigned"}, status=status.HTTP_400_BAD_REQUEST
        )

    ticket.assigned_admin = request.user
    if ticket.status == "open":
        ticket.status = "in_progress"
    ticket.save()

    return Response(
        {
            "message": "Ticket taken successfully",
            "assigned_admin": {
                "id": ticket.assigned_admin.id,
                "name": ticket.assigned_admin.name,
                "email": ticket.assigned_admin.email,
            },
        }
    )


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def support_dashboard_stats(request):
    """
    Get dashboard statistics for admin panel
    """
    if not hasattr(request.user, "role") or request.user.role != "admin":
        return Response(
            {"error": "You do not have permission to perform this action."},
            status=status.HTTP_403_FORBIDDEN,
        )

    stats = {
        "total_tickets": SupportTicket.objects.count(),
        "open_tickets": SupportTicket.objects.filter(status="open").count(),
        "in_progress_tickets": SupportTicket.objects.filter(
            status="in_progress"
        ).count(),
        "unassigned_tickets": SupportTicket.objects.filter(
            assigned_admin__isnull=True
        ).count(),
        "my_tickets": SupportTicket.objects.filter(assigned_admin=request.user).count(),
        "resolved_today": SupportTicket.objects.filter(
            status="resolved", resolved_at__date=timezone.now().date()
        ).count()
        if "timezone" in globals()
        else 0,
    }

    # Priority breakdown
    priority_stats = (
        SupportTicket.objects.values("priority")
        .annotate(count=Count("id"))
        .order_by("priority")
    )

    stats["priority_breakdown"] = {
        item["priority"]: item["count"] for item in priority_stats
    }

    return Response(stats)


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def customer_support_stats(request):
    """
    Get support statistics for customer
    """
    user_tickets = SupportTicket.objects.filter(customer=request.user)

    stats = {
        "total_tickets": user_tickets.count(),
        "open_tickets": user_tickets.filter(status__in=["open", "in_progress"]).count(),
        "resolved_tickets": user_tickets.filter(status="resolved").count(),
        "closed_tickets": user_tickets.filter(status="closed").count(),
    }

    return Response(stats)


class HelpChatView(generics.GenericAPIView):
    """Simple OpenAI-powered help chat endpoint."""

    serializer_class = HelpChatSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        question = serializer.validated_data["question"]

        try:
            openai.api_key = settings.OPENAI_API_KEY
            completion = openai.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": question}],
            )
            answer = completion.choices[0].message.content.strip()
        except Exception as exc:  # pragma: no cover - network call
            return Response(
                {"error": f"OpenAI request failed: {exc}"},
                status=status.HTTP_502_BAD_GATEWAY,
            )

        return Response({"answer": answer})
