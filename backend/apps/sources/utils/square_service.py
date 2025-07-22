import requests
from django.conf import settings


class SquareService:
    def __init__(self, access_token: str):
        self.access_token = access_token
        self.headers = {
            "Authorization": f"Bearer {self.access_token}",
            "Content-Type": "application/json",
            "Square-Version": "2024-05-15",
        }

    @staticmethod
    def refresh_token(refresh_token: str) -> str:
        """Get a new access token using a refresh token."""
        url = "https://connect.squareup.com/oauth2/token"
        data = {
            "client_id": settings.SQUARE_APPLICATION_ID,
            "client_secret": settings.SQUARE_CLIENT_SECRET,
            "grant_type": "refresh_token",
            "refresh_token": refresh_token,
        }
        response = requests.post(url, json=data)
        if response.status_code == 200:
            return response.json().get("access_token")
        else:
            response.raise_for_status()

    def fetch_payments(self) -> list[dict]:
        """Retrieve a list of recent payments."""
        url = "https://connect.squareup.com/v2/payments"
        params = {"limit": 100}
        response = requests.get(url, headers=self.headers, params=params)
        if response.status_code == 200:
            return response.json().get("payments", [])
        else:
            response.raise_for_status()
