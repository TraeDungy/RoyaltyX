from celery import shared_task

from .utils.youtube import fetch_youtube_stats, fetch_youtube_videos


@shared_task
def task_fetch_youtube_videos():
    print("Running task for fetching YouTube videos.", flush=True)
    fetch_youtube_videos()


@shared_task
def task_fetch_youtube_stats():
    print("Running task for fetching YouTube stats.", flush=True)
    fetch_youtube_stats()
