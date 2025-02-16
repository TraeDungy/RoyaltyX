from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
import random
import string
from django.contrib.auth import get_user_model

class AuthenticationTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.registration_url = reverse('register')
        self.login_url = reverse('token_obtain_pair')

        random_number = ''.join(random.choices(string.digits, k=4))
        self.email = f'test_user_{random_number}@test.com'
        self.password = 'Testaccount1_'
        self.name = 'New User'
        self.data = {
            'email': self.email,
            'password': self.password,
            'name': self.name
        }

        response = self.client.post(self.registration_url, self.data, format='json')

        self.assertEqual(response.status_code, 201)
        
        user = get_user_model().objects.filter(email=self.email).first()
        self.assertIsNotNone(user)

    def test_login(self):
        login_data = {
            'email': self.email,
            'password': self.password
        }
        response = self.client.post(self.login_url, login_data, format='json')

        self.assertEqual(response.status_code, 200)
        self.assertIn('access', response.data)
