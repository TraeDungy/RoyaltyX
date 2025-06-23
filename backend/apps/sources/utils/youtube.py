import requests

from django.conf import settings


def request_users_youtube_content(access_token: str) -> dict:
    """
    Fetch YouTube list of videos that this account owns.
    """
    url = "https://www.googleapis.com/youtube/v3/search"
    params = {
        "part": "snippet",
        "channelId": "UCJ3hMETsGkmAwviqgd2ICQw",
        "type": "video",
        "order": "date",
        "maxResults": 50,
    }
    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    response = requests.get(url, headers=headers, params=params)

    if response.status_code == 200:
        return response.json()
    else:
        response.raise_for_status()

def request_youtube_stats(access_token: str) -> dict:
    """
    Fetch YouTube stats using the provided access token.
    """
    url = "https://youtubeanalytics.googleapis.com/v2/reports"
    params = {
        "ids": "channel==UCJ3hMETsGkmAwviqgd2ICQw",
        "startDate": "2024-01-01",
        "endDate": "2024-06-01",
        "metrics": "views,estimatedMinutesWatched"
    }
    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    response = requests.get(url, headers=headers, params=params)

    if response.status_code == 200:
        return response.json()
    else:
        response.raise_for_status()


def refresh_access_token(refresh_token: str) -> str:
    """
    Use the refresh token to get a new access token from Google.
    """
    url = "https://oauth2.googleapis.com/token"
    data = {
        "client_id": settings.GOOGLE_CLIENT_ID,
        "client_secret": settings.GOOGLE_CLIENT_SECRET,
        "refresh_token": refresh_token,
        "grant_type": "refresh_token"
    }

    response = requests.post(url, data=data)

    if response.status_code == 200:
        return response.json().get("access_token")
    else:
        response.raise_for_status()