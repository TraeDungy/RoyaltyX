import random
import string

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from apps.product.models import Product
from apps.project.models import Project, ProjectUser


class ProductCRUDTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.User = get_user_model()
        random_number = "".join(random.choices(string.digits, k=4))
        email = f"owner_{random_number}@example.com"
        self.user = self.User.objects.create_user(
            email=email,
            name="Owner",
            password="pass1234",
        )
        self.project = Project.objects.create(name="Project CRUD")
        ProjectUser.objects.create(
            project=self.project,
            user=self.user,
            role=ProjectUser.PROJECT_USER_ROLE_OWNER,
        )
        self.user.currently_selected_project = self.project
        self.user.save()
        self.client.force_authenticate(user=self.user)

    def test_full_crud_flow(self):
        create_url = reverse("product_list_create")
        payload = {"project": self.project.id, "title": "Prod", "description": "Desc"}
        res = self.client.post(create_url, payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        product_id = res.data["id"]

        list_res = self.client.get(create_url)
        self.assertEqual(list_res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(list_res.data), 1)

        detail_url = reverse("product_detail", args=[product_id])
        detail_res = self.client.get(detail_url)
        self.assertEqual(detail_res.status_code, status.HTTP_200_OK)
        self.assertEqual(detail_res.data["title"], "Prod")

        update_payload = {"title": "Updated"}
        update_res = self.client.put(detail_url, update_payload)
        self.assertEqual(update_res.status_code, status.HTTP_200_OK)
        self.assertEqual(update_res.data["title"], "Updated")

        delete_res = self.client.delete(detail_url)
        self.assertEqual(delete_res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Product.objects.filter(id=product_id).exists())

    def test_viewer_cannot_modify(self):
        # change role to viewer
        pu = ProjectUser.objects.get(project=self.project, user=self.user)
        pu.role = ProjectUser.PROJECT_USER_ROLE_VIEWER
        pu.save()

        url = reverse("product_list_create")
        payload = {"project": self.project.id, "title": "Prod", "description": ""}
        res = self.client.post(url, payload)
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

        product = Product.objects.create(
            project=self.project,
            title="Prod1",
            description="",
        )
        detail_url = reverse("product_detail", args=[product.id])
        res = self.client.put(detail_url, {"title": "x"})
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)
        res = self.client.delete(detail_url)
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)
