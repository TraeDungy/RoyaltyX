from django.apps import AppConfig


class PaymentsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.payments"

    def ready(self):
        import json
        import os

        from django_celery_beat.models import IntervalSchedule, PeriodicTask

        from . import tasks  # noqa: F401

        if os.environ.get("RUN_MAIN") != "true":
            return

        schedule, _ = IntervalSchedule.objects.get_or_create(
            every=24, period=IntervalSchedule.HOURS
        )

        PeriodicTask.objects.get_or_create(
            name="Downgrade Past Due Users",
            defaults={
                "interval": schedule,
                "task": "apps.payments.tasks.downgrade_past_due_users",
                "args": json.dumps([]),
            },
        )
