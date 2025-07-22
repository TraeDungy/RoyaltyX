from django.contrib.auth import get_user_model
from django.test import TestCase

from apps.notifications.models import Notification
from apps.notifications.utils import create_notification


class NotificationUtilsTests(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            email="notify@example.com", name="Notify", password="pass1234"
        )

    def test_create_notification_invalid_user(self):
        with self.assertRaises(ValueError):
            create_notification("not-a-user", "Hello")

    def test_create_notification_success(self):
        notif = create_notification(self.user, "Hello")
        self.assertIsInstance(notif, Notification)
        self.assertEqual(notif.title, "Hello")
        self.assertEqual(notif.user, self.user)
