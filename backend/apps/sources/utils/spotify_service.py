import requests
from django.conf import settings


class SpotifyService:
    def __init__(self, access_token: str):
        self.access_token = access_token
        self.headers = {
            "Authorization": f"Bearer {self.access_token}",
            "Content-Type": "application/json",
        }

    @staticmethod
    def refresh_token(refresh_token: str) -> str:
        url = "https://accounts.spotify.com/api/token"
        data = {
            "grant_type": "refresh_token",
            "refresh_token": refresh_token,
            "client_id": settings.SPOTIFY_CLIENT_ID,
            "client_secret": settings.SPOTIFY_CLIENT_SECRET,
        }
        response = requests.post(url, data=data)
        if response.status_code == 200:
            return response.json().get("access_token")
        else:
            response.raise_for_status()

    def fetch_user_info(self) -> dict:
        url = "https://api.spotify.com/v1/me"
        response = requests.get(url, headers=self.headers)
        if response.status_code == 200:
            return response.json()
        else:
            response.raise_for_status()

    def fetch_tracks(self) -> list[dict]:
        url = "https://api.spotify.com/v1/me/tracks"
        params = {"limit": 50}
        response = requests.get(url, headers=self.headers, params=params)
        if response.status_code == 200:
            return response.json().get("items", [])
        else:
            response.raise_for_status()

    def fetch_track_stats(self, track_id: str) -> dict:
        url = f"https://api.spotify.com/v1/tracks/{track_id}"
        response = requests.get(url, headers=self.headers)
        if response.status_code == 200:
            return response.json()
        else:
            response.raise_for_status()
