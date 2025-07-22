from django.apps import AppConfig


class SourcesConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.sources"

    def ready(self):
        """Register periodic Celery tasks for syncing external sources.

        When the Django process starts (and ``RUN_MAIN`` is ``true``), this
        method ensures that the database scheduler provided by
        ``django-celery-beat`` contains entries for all synchronization tasks.
        Each task runs once every 24 hours to keep video and statistics data
        up to date.

        The following periodic jobs are created if they do not already exist:

        - ``Fetch Youtube Videos`` → ``task_fetch_youtube_videos``
        - ``Fetch YouTube Stats`` → ``task_fetch_youtube_stats``
        - ``Fetch TikTok Videos`` → ``task_fetch_tiktok_videos``
        - ``Fetch TikTok Stats`` → ``task_fetch_tiktok_stats``
        """
        import json
        import os

        from django_celery_beat.models import (
            IntervalSchedule,
            PeriodicTask,
        )

        from . import tasks  # noqa: F401

        if os.environ.get("RUN_MAIN") != "true":
            return

        # Create (or reuse) a 24-hour interval schedule used for all tasks.
        schedule, _ = IntervalSchedule.objects.get_or_create(
            every=24, period=IntervalSchedule.HOURS
        )

        # Daily synchronization of new videos from YouTube.
        PeriodicTask.objects.get_or_create(
            name="Fetch Youtube Videos",
            defaults={
                "interval": schedule,
                "task": "apps.sources.tasks.task_fetch_youtube_videos",
                "args": json.dumps([]),
            },
        )

        # Daily refresh of YouTube statistics.
        PeriodicTask.objects.get_or_create(
            name="Fetch YouTube Stats",
            defaults={
                "interval": schedule,
                "task": "apps.sources.tasks.task_fetch_youtube_stats",
                "args": json.dumps([]),
            },
        )

        # Daily synchronization of new videos from TikTok.
        PeriodicTask.objects.get_or_create(
            name="Fetch TikTok Videos",
            defaults={
                "interval": schedule,
                "task": "apps.sources.tasks.task_fetch_tiktok_videos",
                "args": json.dumps([]),
            },
        )

        # Daily refresh of TikTok video statistics.
        PeriodicTask.objects.get_or_create(
            name="Fetch TikTok Stats",
            defaults={
                "interval": schedule,
                "task": "apps.sources.tasks.task_fetch_tiktok_stats",
                "args": json.dumps([]),
            },
        )

