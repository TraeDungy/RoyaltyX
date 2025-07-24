from django.db import migrations, models
from django.conf import settings

class Migration(migrations.Migration):

    dependencies = [
        ("analytics", "0002_analyticsforecast"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="DashboardPreference",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("is_deleted", models.BooleanField(default=False)),
                ("data", models.JSONField(blank=True, default=dict)),
                (
                    "user",
                    models.OneToOneField(on_delete=models.deletion.CASCADE, related_name="dashboard_preference", to=settings.AUTH_USER_MODEL),
                ),
            ],
            options={"db_table": "dashboard_preference"},
        ),
    ]
