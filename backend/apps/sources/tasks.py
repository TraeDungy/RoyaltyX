from celery import shared_task

from common.models import TaskStatus
from apps.sources.models import Source

from apps.sources.utils.tiktok_sync import fetch_tiktok_stats, fetch_tiktok_videos
from apps.sources.utils.twitch_sync import fetch_twitch_stats, fetch_twitch_videos

from .utils.youtube import fetch_youtube_stats, fetch_youtube_videos


@shared_task(bind=True)
def task_fetch_youtube_videos(self):
    print("Running task for fetching YouTube videos.", flush=True)
    task_status, _ = TaskStatus.objects.get_or_create(celery_id=self.request.id)
    sources = Source.objects.filter(platform=Source.PLATFORM_YOUTUBE)
    total = sources.count() or 1
    for i, source in enumerate(sources, start=1):
        fetch_youtube_videos(source.id)
        progress = int(i / total * 100)
        self.update_state(state="PROGRESS", meta={"progress": progress})
        task_status.progress = progress
        task_status.message = f"Fetched videos for {source.id}"
        task_status.save(update_fields=["progress", "message"])
    task_status.progress = 100
    task_status.message = "Completed"
    task_status.save(update_fields=["progress", "message"])
    return {"progress": 100}


@shared_task(bind=True)
def task_fetch_youtube_stats(self):
    print("Running task for fetching YouTube stats.", flush=True)
    task_status, _ = TaskStatus.objects.get_or_create(celery_id=self.request.id)
    sources = Source.objects.filter(platform=Source.PLATFORM_YOUTUBE)
    total = sources.count() or 1
    for i, source in enumerate(sources, start=1):
        fetch_youtube_stats(source.id)
        progress = int(i / total * 100)
        self.update_state(state="PROGRESS", meta={"progress": progress})
        task_status.progress = progress
        task_status.message = f"Fetched stats for {source.id}"
        task_status.save(update_fields=["progress", "message"])
    task_status.progress = 100
    task_status.message = "Completed"
    task_status.save(update_fields=["progress", "message"])
    return {"progress": 100}

@shared_task(bind=True)
def task_fetch_tiktok_videos(self):
    print("Running task for fetching TikTok videos.", flush=True)
    task_status, _ = TaskStatus.objects.get_or_create(celery_id=self.request.id)
    sources = Source.objects.filter(platform=Source.PLATFORM_TIKTOK)
    total = sources.count() or 1
    for i, source in enumerate(sources, start=1):
        fetch_tiktok_videos(source.id)
        progress = int(i / total * 100)
        self.update_state(state="PROGRESS", meta={"progress": progress})
        task_status.progress = progress
        task_status.message = f"Fetched videos for {source.id}"
        task_status.save(update_fields=["progress", "message"])
    task_status.progress = 100
    task_status.message = "Completed"
    task_status.save(update_fields=["progress", "message"])
    return {"progress": 100}


@shared_task(bind=True)
def task_fetch_tiktok_stats(self):
    print("Running task for fetching TikTok stats.", flush=True)
    task_status, _ = TaskStatus.objects.get_or_create(celery_id=self.request.id)
    sources = Source.objects.filter(platform=Source.PLATFORM_TIKTOK)
    total = sources.count() or 1
    for i, source in enumerate(sources, start=1):
        fetch_tiktok_stats(source.id)
        progress = int(i / total * 100)
        self.update_state(state="PROGRESS", meta={"progress": progress})
        task_status.progress = progress
        task_status.message = f"Fetched stats for {source.id}"
        task_status.save(update_fields=["progress", "message"])
    task_status.progress = 100
    task_status.message = "Completed"
    task_status.save(update_fields=["progress", "message"])
    return {"progress": 100}


@shared_task(bind=True)
def task_fetch_twitch_videos(self):
    print("Running task for fetching Twitch videos.", flush=True)
    task_status, _ = TaskStatus.objects.get_or_create(celery_id=self.request.id)
    sources = Source.objects.filter(platform=Source.PLATFORM_TWITCH)
    total = sources.count() or 1
    for i, source in enumerate(sources, start=1):
        fetch_twitch_videos(source.id)
        progress = int(i / total * 100)
        self.update_state(state="PROGRESS", meta={"progress": progress})
        task_status.progress = progress
        task_status.message = f"Fetched videos for {source.id}"
        task_status.save(update_fields=["progress", "message"])
    task_status.progress = 100
    task_status.message = "Completed"
    task_status.save(update_fields=["progress", "message"])
    return {"progress": 100}


@shared_task(bind=True)
def task_fetch_twitch_stats(self):
    print("Running task for fetching Twitch stats.", flush=True)
    task_status, _ = TaskStatus.objects.get_or_create(celery_id=self.request.id)
    sources = Source.objects.filter(platform=Source.PLATFORM_TWITCH)
    total = sources.count() or 1
    for i, source in enumerate(sources, start=1):
        fetch_twitch_stats(source.id)
        progress = int(i / total * 100)
        self.update_state(state="PROGRESS", meta={"progress": progress})
        task_status.progress = progress
        task_status.message = f"Fetched stats for {source.id}"
        task_status.save(update_fields=["progress", "message"])
    task_status.progress = 100
    task_status.message = "Completed"
    task_status.save(update_fields=["progress", "message"])
    return {"progress": 100}
