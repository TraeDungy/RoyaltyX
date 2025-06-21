from celery import shared_task
from .models import Source
from django.utils import timezone


@shared_task
def fetch_youtube_stats():

    sources = Source.objects.all()

    for source in sources:
        source.last_fetched_at = timezone.now()
        source.save(update_fields=['last_fetched_at'])

    print("Fetching YouTube stats...", flush=True)
