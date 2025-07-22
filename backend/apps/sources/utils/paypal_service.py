import requests
from django.conf import settings


class PayPalService:
    """Simple service wrapper for PayPal API calls."""

    base_url = "https://api-m.paypal.com"

    def __init__(self, access_token: str):
        self.access_token = access_token
        self.headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.access_token}",
        }

    @staticmethod
    def refresh_token(refresh_token: str) -> str:
        """Exchange refresh token for new access token."""
        url = f"{PayPalService.base_url}/v1/oauth2/token"
        data = {
            "grant_type": "refresh_token",
            "refresh_token": refresh_token,
        }
        auth = (settings.PAYPAL_CLIENT_ID, settings.PAYPAL_CLIENT_SECRET)
        response = requests.post(url, data=data, auth=auth)
        if response.status_code == 200:
            return response.json().get("access_token")
        response.raise_for_status()

    def fetch_transactions(self, start_date: str, end_date: str) -> list[dict]:
        """Fetch PayPal transactions for the given date range."""
        url = f"{self.base_url}/v1/reporting/transactions"
        params = {
            "start_date": start_date,
            "end_date": end_date,
        }
        response = requests.get(url, headers=self.headers, params=params)
        if response.status_code == 200:
            return response.json().get("transaction_details", [])
        response.raise_for_status()
        return []
