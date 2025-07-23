from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from apps.project.models import Project, ProjectUser
from apps.fees.models import FeeType, FeeGroup, FeeRule, FeeAdjustment


class FeeAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        User = get_user_model()
        self.user = User.objects.create_user(
            email="fee@test.com", name="Fee User", password="pass1234"
        )
        self.project = Project.objects.create(name="Fees", description="d")
        ProjectUser.objects.create(
            project=self.project,
            user=self.user,
            role=ProjectUser.PROJECT_USER_ROLE_OWNER,
        )
        self.user.currently_selected_project = self.project
        self.user.save()
        self.client.force_authenticate(user=self.user)
        self.group_url = reverse("fee-group-list")
        self.rule_url = reverse("fee-rule-list")
        self.report_url = reverse("fee-report")
        self.fee_type = FeeType.objects.create(name="Platform")

    def test_create_group_and_rule(self):
        group_resp = self.client.post(self.group_url, {"name": "Default"})
        self.assertEqual(group_resp.status_code, status.HTTP_201_CREATED)
        group_id = group_resp.data["id"]

        rule_resp = self.client.post(
            self.rule_url,
            {
                "fee_type": self.fee_type.id,
                "group": group_id,
                "name": "Percent Fee",
                "rate": 10,
                "is_percent": True,
            },
        )
        self.assertEqual(rule_resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(rule_resp.data["group"], group_id)

    def test_fee_report_visibility(self):
        rule_visible = FeeRule.objects.create(
            project=self.project,
            fee_type=self.fee_type,
            name="Visible",
            rate=5,
            is_percent=True,
            display_on_reports=True,
        )
        rule_hidden = FeeRule.objects.create(
            project=self.project,
            fee_type=self.fee_type,
            name="Hidden",
            rate=2,
            is_percent=True,
            display_on_reports=False,
        )
        FeeAdjustment.objects.create(rule=rule_visible, amount=10)
        FeeAdjustment.objects.create(rule=rule_hidden, amount=5)

        resp = self.client.get(self.report_url)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        names = [r["rule__fee_type__name"] for r in resp.data]
        self.assertIn("Platform", names)
        self.assertIn("Hidden Fees", names)

