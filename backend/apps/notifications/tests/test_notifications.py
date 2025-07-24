from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient

from apps.notifications.models import Notification
from apps.notifications.utils import create_notification

User = get_user_model()


class NotificationTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email="notify@example.com",
            name="Notify User",
            password="pass1234",
        )
        self.client.force_authenticate(user=self.user)
        self.url = reverse("notifications-list-update")

    def test_create_notification_utility(self):
        notification = create_notification(self.user, "Welcome")
        self.assertEqual(Notification.objects.count(), 1)
        self.assertEqual(notification.title, "Welcome")
        self.assertEqual(notification.user, self.user)

    def test_create_notification_invalid_user(self):
        with self.assertRaises(ValueError):
            create_notification("invalid", "Fail")

    def test_list_and_mark_notifications(self):
        create_notification(self.user, "First")
        create_notification(self.user, "Second")

        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["unread_count"], 2)
        self.assertEqual(len(response.data["notifications"]), 2)

        response = self.client.post(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            Notification.objects.filter(user=self.user, is_read=False).count(),
            0,
        )
