import requests


class ShopifyService:
    def __init__(self, store_domain: str, access_token: str):
        self.store_domain = store_domain
        self.access_token = access_token
        self.base_url = f"https://{store_domain}/admin/api/2024-01"
        self.headers = {
            "X-Shopify-Access-Token": self.access_token,
            "Content-Type": "application/json",
        }

    def fetch_orders(self, limit: int = 50) -> list[dict]:
        url = f"{self.base_url}/orders.json"
        params = {"limit": limit, "status": "any"}
        response = requests.get(url, headers=self.headers, params=params)
        if response.status_code == 200:
            return response.json().get("orders", [])
        response.raise_for_status()

    def fetch_store(self) -> dict:
        url = f"{self.base_url}/shop.json"
        response = requests.get(url, headers=self.headers)
        if response.status_code == 200:
            return response.json().get("shop", {})
        response.raise_for_status()
