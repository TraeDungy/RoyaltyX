import random
import string

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient


class AuthenticationTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.registration_url = reverse("register")
        self.login_url = reverse("token_obtain_pair")

        random_number = "".join(random.choices(string.digits, k=4))
        self.email = f"test_user_{random_number}@test.com"
        self.password = "Testaccount1_"
        self.name = "New User"
        self.data = {"email": self.email, "password": self.password, "name": self.name}

        response = self.client.post(self.registration_url, self.data, format="json")

        self.assertEqual(response.status_code, 201)

        user = get_user_model().objects.filter(email=self.email).first()
        self.assertIsNotNone(user)

    def test_login(self):
        login_data = {"email": self.email, "password": self.password}
        response = self.client.post(self.login_url, login_data, format="json")

        self.assertEqual(response.status_code, 200)
        self.assertIn("access", response.data)

    def test_successful_registration(self):
        """Test successful user registration with valid data"""
        random_number = "".join(random.choices(string.digits, k=4))
        registration_data = {
            "email": f"newuser_{random_number}@test.com",
            "password": "SecurePassword123_",
            "name": "Test User"
        }
        
        response = self.client.post(self.registration_url, registration_data, format="json")
        
        self.assertEqual(response.status_code, 201)
        self.assertIn("user", response.data)
        self.assertEqual(response.data["user"]["email"], registration_data["email"])
        self.assertEqual(response.data["user"]["name"], registration_data["name"])
        
        # Verify user was created in database
        user = get_user_model().objects.filter(email=registration_data["email"]).first()
        self.assertIsNotNone(user)
        self.assertEqual(user.email, registration_data["email"])
        self.assertEqual(user.name, registration_data["name"])
        self.assertEqual(user.username, registration_data["email"])
        self.assertTrue(user.check_password(registration_data["password"]))
        self.assertEqual(user.role, "user")
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_registration_missing_email(self):
        """Test registration fails when email is missing"""
        registration_data = {
            "password": "SecurePassword123_",
            "name": "Test User"
        }
        
        response = self.client.post(self.registration_url, registration_data, format="json")
        
        self.assertEqual(response.status_code, 400)
        self.assertIn("This field is required.", response.data["email"][0])

    def test_registration_missing_password(self):
        """Test registration fails when password is missing"""
        random_number = "".join(random.choices(string.digits, k=4))
        registration_data = {
            "email": f"testuser_{random_number}@test.com",
            "name": "Test User"
        }
        
        response = self.client.post(self.registration_url, registration_data, format="json")
        
        self.assertEqual(response.status_code, 400)
        self.assertIn("This field is required.", response.data['password'][0])

    def test_registration_missing_name(self):
        """Test registration with missing name (should still work as name has default)"""
        random_number = "".join(random.choices(string.digits, k=4))
        registration_data = {
            "email": f"testuser_{random_number}@test.com",
            "password": "SecurePassword123_"
        }
        
        response = self.client.post(self.registration_url, registration_data, format="json")
        
        self.assertEqual(response.status_code, 400)
        self.assertIn("This field is required.", response.data['name'][0])

    def test_registration_duplicate_email(self):
        """Test registration fails with duplicate email"""
        # Use the email from setUp (already registered)
        duplicate_registration_data = {
            "email": self.email,
            "password": "AnotherPassword123_",
            "name": "Another User"
        }
        
        response = self.client.post(self.registration_url, duplicate_registration_data, format="json")
        
        self.assertEqual(response.status_code, 400)
        self.assertIn("Email is already registered.", response.data["email"][0])

    def test_registration_invalid_email_format(self):
        """Test registration fails with invalid email format"""
        registration_data = {
            "email": "invalid-email-format",
            "password": "SecurePassword123_",
            "name": "Test User"
        }
        
        response = self.client.post(self.registration_url, registration_data, format="json")
        
        self.assertEqual(response.status_code, 400)
        self.assertIn('Enter a valid email address.', response.data['email'][0])

    def test_registration_empty_email(self):
        """Test registration fails with empty email"""
        registration_data = {
            "email": "",
            "password": "SecurePassword123_",
            "name": "Test User"
        }
        
        response = self.client.post(self.registration_url, registration_data, format="json")
        
        self.assertEqual(response.status_code, 400)
        self.assertIn("This field may not be blank.", response.data['email'][0])

    def test_registration_empty_password(self):
        """Test registration fails with empty password"""
        random_number = "".join(random.choices(string.digits, k=4))
        registration_data = {
            "email": f"testuser_{random_number}@test.com",
            "password": "",
            "name": "Test User"
        }
        
        response = self.client.post(self.registration_url, registration_data, format="json")
        
        self.assertEqual(response.status_code, 400)
        self.assertIn("This field may not be blank.", response.data["password"][0])
