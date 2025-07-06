from django.urls import path

from . import views

app_name = "support"

urlpatterns = [
    # Customer endpoints
    path(
        "tickets/",
        views.CustomerSupportTicketListView.as_view(),
        name="customer-tickets",
    ),
    path(
        "tickets/<uuid:pk>/",
        views.CustomerSupportTicketDetailView.as_view(),
        name="customer-ticket-detail",
    ),
    path(
        "tickets/<uuid:ticket_id>/messages/",
        views.create_support_message,
        name="create-message",
    ),
    path("stats/", views.customer_support_stats, name="customer-stats"),
    # Admin endpoints
    path(
        "admin/tickets/",
        views.AdminSupportTicketListView.as_view(),
        name="admin-tickets",
    ),
    path(
        "admin/tickets/<uuid:pk>/",
        views.AdminSupportTicketDetailView.as_view(),
        name="admin-ticket-detail",
    ),
    path(
        "admin/tickets/<uuid:ticket_id>/assign/",
        views.assign_ticket,
        name="assign-ticket",
    ),
    path("admin/tickets/<uuid:ticket_id>/take/", views.take_ticket, name="take-ticket"),
    path("admin/stats/", views.support_dashboard_stats, name="admin-stats"),
]
