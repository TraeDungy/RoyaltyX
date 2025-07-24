from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from apps.support.models import SupportTicket

User = get_user_model()


class SupportTicketTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email="customer@example.com",
            name="Customer",
            password="pass1234",
        )
        self.client.force_authenticate(user=self.user)
        self.url = reverse("support:customer-tickets")

    def test_create_support_ticket(self):
        data = {
            "subject": "Need help",
            "priority": "high",
            "initial_message": "<b>Hello</b><script>alert(1)</script>",
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(SupportTicket.objects.count(), 1)

        ticket = SupportTicket.objects.first()
        self.assertEqual(ticket.subject, "Need help")
        self.assertEqual(ticket.customer, self.user)
        self.assertTrue(ticket.ticket_number.startswith("SUP-"))

        message = ticket.messages.first()
        self.assertEqual(message.sender, self.user)
        self.assertEqual(message.message_type, "customer")
        self.assertNotIn("<script>", message.content)
