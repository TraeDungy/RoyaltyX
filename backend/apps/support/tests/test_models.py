from django.contrib.auth import get_user_model
from django.test import TestCase

from apps.support.models import SupportTicket


class SupportTicketModelTests(TestCase):
    def test_ticket_number_generated_on_save(self):
        user = get_user_model().objects.create_user(
            email="user@example.com", name="Test User", password="pass1234"
        )
        ticket = SupportTicket.objects.create(subject="Help", customer=user)
        self.assertTrue(ticket.ticket_number.startswith("SUP-"))
        self.assertGreater(len(ticket.ticket_number), 8)
