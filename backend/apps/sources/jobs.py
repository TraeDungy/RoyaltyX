from celery import shared_task


@shared_task
def fetch_youtube_stats():
    print("Fetching YouTube stats...", flush=True)
