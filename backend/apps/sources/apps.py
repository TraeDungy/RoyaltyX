from django.apps import AppConfig


class SourcesConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.sources"

    def ready(self):
        import json
        import os

        from django.db.utils import IntegrityError
        from django_celery_beat.models import IntervalSchedule, PeriodicTask

        from . import tasks  # noqa: F401

        if os.environ.get("RUN_MAIN") != "true":
            return

        schedule, created = IntervalSchedule.objects.get_or_create(
            every=1, period=IntervalSchedule.MINUTES
        )

        try:
            PeriodicTask.objects.get_or_create(
                name="Fetch Data From Connected Sources",
                defaults={
                    "interval": schedule,
                    "task": "apps.sources.tasks.fetch_youtube_stats",
                    "args": json.dumps([]),
                },
            )
        except IntegrityError:
            print("Integrity error", flush=True)
            pass
