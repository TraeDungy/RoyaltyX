from rest_framework.test import APITestCase
from rest_framework import status
from apps.user.models import User
from apps.product.models import Product

class ProductAPITestCase(APITestCase):

    def setUp(self):
        # Create a test user and authenticate
        self.user = User.objects.create_user(name="Test User", email='testuser@test.com', password='SomeRandomStrongPass132_')
        self.client.force_authenticate(user=self.user)

        # Create a sample product
        self.product = Product.objects.create(
            title="Test Product",
            statement_frequency="Monthly",
            first_statement_end_date="2024-12-31",
            payment_threshold=100.00,
            payment_window=10,
            is_active=True,
            notes="Test notes",
        )

        self.product_url = f"/products/{self.product.id}/"
        self.list_create_url = "/products/"

    def test_create_product(self):
        """Test creating a product"""
        data = {
            "title": "New Product",
            "statement_frequency": "Quarterly",
            "first_statement_end_date": "2025-03-31",
            "payment_threshold": 200.00,
            "payment_window": 15,
            "is_active": True,
            "notes": "New product notes",
        }
        response = self.client.post(self.list_create_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["title"], "New Product")

    def test_list_products(self):
        """Test retrieving the list of products"""
        response = self.client.get(self.list_create_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_retrieve_product(self):
        """Test retrieving a single product"""
        response = self.client.get(self.product_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], "Test Product")

    def test_update_product(self):
        """Test updating an existing product"""
        data = {
            "title": "Updated Product",
            "statement_frequency": "Annually",
            "first_statement_end_date": "2025-12-31",
            "payment_threshold": 500.00,
            "payment_window": 20,
            "is_active": False,
            "notes": "Updated notes",
        }
        response = self.client.put(self.product_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], "Updated Product")
        self.assertEqual(response.data["is_active"], False)

    def test_delete_product(self):
        """Test deleting a product"""
        response = self.client.delete(self.product_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Product.objects.filter(id=self.product.id).exists())

    def test_unauthorized_access(self):
        """Test that unauthenticated users cannot access endpoints"""
        self.client.logout()

        # Check that all actions require authentication
        response = self.client.get(self.list_create_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        response = self.client.post(self.list_create_url, {}, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        response = self.client.get(self.product_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        response = self.client.put(self.product_url, {}, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        response = self.client.delete(self.product_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
