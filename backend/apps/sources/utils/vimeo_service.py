import requests
from django.conf import settings


class VimeoService:
    def __init__(self, access_token: str):
        self.access_token = access_token
        self.headers = {
            "Authorization": f"Bearer {self.access_token}",
            "Content-Type": "application/json",
        }

    @staticmethod
    def refresh_token(refresh_token: str) -> str:
        """Get a new access token using refresh token."""
        url = "https://api.vimeo.com/oauth/access_token"
        data = {
            "grant_type": "refresh_token",
            "refresh_token": refresh_token,
            "client_id": settings.VIMEO_CLIENT_ID,
            "client_secret": settings.VIMEO_CLIENT_SECRET,
        }
        response = requests.post(url, data=data)
        if response.status_code == 200:
            return response.json().get("access_token")
        else:
            response.raise_for_status()

    def fetch_user_info(self) -> dict:
        """Get authenticated user's information."""
        url = "https://api.vimeo.com/me"
        response = requests.get(url, headers=self.headers)
        if response.status_code == 200:
            return response.json()
        response.raise_for_status()

    def fetch_videos(self) -> list[dict]:
        """Fetch user's videos."""
        url = "https://api.vimeo.com/me/videos"
        params = {"per_page": 50}
        response = requests.get(url, headers=self.headers, params=params)
        if response.status_code == 200:
            return response.json().get("data", [])
        response.raise_for_status()

    def fetch_video_stats(self, video_id: str) -> dict:
        """Fetch stats for a given video."""
        url = f"https://api.vimeo.com/videos/{video_id}"
        params = {"fields": "stats.plays"}
        response = requests.get(url, headers=self.headers, params=params)
        if response.status_code == 200:
            return response.json().get("stats", {})
        response.raise_for_status()
