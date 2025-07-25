import random
import string

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from apps.product.models import Product, ProductImage
from apps.product.models import ProductUser as ProdUser
from apps.project.models import Project, ProjectUser


class ProductPermissionTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.User = get_user_model()

        random_number = "".join(random.choices(string.digits, k=4))
        self.email = f"test_{random_number}@example.com"
        self.user = self.User.objects.create_user(
            email=self.email, name="Test User", password="pass1234"
        )

        # create two projects
        self.project1 = Project.objects.create(name="Project 1")
        self.project2 = Project.objects.create(name="Project 2")

        # assign user to project1 and select it
        ProjectUser.objects.create(
            project=self.project1,
            user=self.user,
            role=ProjectUser.PROJECT_USER_ROLE_OWNER,
        )
        self.user.currently_selected_project = self.project1
        self.user.save()

        # authenticate
        self.client.force_authenticate(user=self.user)

        # create product in each project
        self.product1 = Product.objects.create(
            project=self.project1, title="Prod 1", description=""
        )
        self.product2 = Product.objects.create(
            project=self.project2, title="Prod 2", description=""
        )

        # create image for second project
        self.image2 = ProductImage.objects.create(
            project=self.project2, product=self.product2, image="path/img.jpg"
        )

        # create product user in second project
        other = self.User.objects.create_user(
            email=f"other_{random_number}@example.com",
            name="Other",
            password="pass1234",
        )
        self.prod_user = ProdUser.objects.create(
            product=self.product2, user=other, producer_fee=10
        )

    def test_product_detail_wrong_project_returns_404(self):
        url = reverse("product_detail", args=[self.product2.id])
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_product_user_detail_wrong_project_returns_404(self):
        url = reverse(
            "product_user_detail",
            kwargs={"product_id": self.product2.id, "user_id": self.prod_user.user.id},
        )
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_product_image_detail_wrong_project_returns_404(self):
        url = reverse("product_image_detail", args=[self.image2.id])
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)
