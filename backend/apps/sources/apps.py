from django.apps import AppConfig


class SourcesConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.sources"

    def ready(self):
        import json
        import os

        from django.db.utils import IntegrityError
        from django_celery_beat.models import CrontabSchedule, PeriodicTask

        from . import jobs

        if os.environ.get("RUN_MAIN") != "true":
            return

        schedule, created = CrontabSchedule.objects.get_or_create(
            minute="40", hour="1", day_of_week="*", day_of_month="*", month_of_year="*"
        )

        try:
            PeriodicTask.objects.get_or_create(
                name="Fetch Data From Connected Sources",
                defaults={
                    'crontab': schedule,
                    "task": "apps.sources.jobs.fetch_youtube_stats",
                    "args": json.dumps([]),
                },
            )
        except IntegrityError:
            print("Integrity error", flush=True)
            pass
