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

        from django_celery_beat.models import IntervalSchedule, PeriodicTask

        from django.conf import settings

        from . import tasks  # noqa: F401
        from .plugins import load_plugins, registry

        load_plugins(settings.SOURCE_PLUGIN_APPS)

        if os.environ.get("RUN_MAIN") != "true":
            return

        # Create (or reuse) a 24-hour interval schedule used for all tasks.
        schedule, _ = IntervalSchedule.objects.get_or_create(
            every=24, period=IntervalSchedule.HOURS
        )

        for plugin_name in registry.keys():
            PeriodicTask.objects.get_or_create(
                name=f"{plugin_name}-fetch-videos",
                defaults={
                    "interval": schedule,
                    "task": "apps.sources.tasks.run_plugin_fetch_videos",
                    "args": json.dumps([plugin_name]),
                },
            )

            PeriodicTask.objects.get_or_create(
                name=f"{plugin_name}-fetch-stats",
                defaults={
                    "interval": schedule,
                    "task": "apps.sources.tasks.run_plugin_fetch_stats",
                    "args": json.dumps([plugin_name]),
                },
            )

