import random
import string

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from .models import PerformanceMilestone
from .utils import check_milestones

User = get_user_model()


class PerformanceMilestoneTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        random_number = "".join(random.choices(string.digits, k=4))
        self.email = f"user_{random_number}@test.com"
        self.user = User.objects.create_user(
            email=self.email, name="Test User", password="Password123_"
        )
        self.client.force_authenticate(user=self.user)
        self.url = reverse("milestone-list-create")

    def test_create_and_achieve_milestone(self):
        data = {
            "metric": PerformanceMilestone.METRIC_SALES,
            "threshold": 1,
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(PerformanceMilestone.objects.count(), 1)

        metrics = {"sales": 1}
        check_milestones(self.user, metrics)
        milestone = PerformanceMilestone.objects.first()
        self.assertIsNotNone(milestone.achieved_at)
