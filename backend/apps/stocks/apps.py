from django.apps import AppConfig


class StocksConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.stocks"

    def ready(self):
        import json
        import os
        from django_celery_beat.models import IntervalSchedule, PeriodicTask
        from . import tasks  # noqa: F401

        if os.environ.get("RUN_MAIN") != "true":
            return

        schedule, _ = IntervalSchedule.objects.get_or_create(every=24, period=IntervalSchedule.HOURS)
        PeriodicTask.objects.get_or_create(
            name="Fetch Stock Prices",
            defaults={
                "interval": schedule,
                "task": "apps.stocks.tasks.task_fetch_stock_prices",
                "args": json.dumps([]),
            },
        )
