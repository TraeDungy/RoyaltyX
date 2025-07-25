# Generated by Django 5.0.6 on 2025-06-20 08:16

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("project", "0008_alter_projectuser_role"),
        ("report", "0003_alter_report_period_end_alter_report_period_start"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="ReportTemplates",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("is_deleted", models.BooleanField(default=False)),
                ("template_name", models.CharField(max_length=255)),
                ("title", models.CharField(max_length=100, blank=True, null=True)),
                (
                    "logo",
                    models.ImageField(
                        blank=True, null=True, upload_to="report-templates/"
                    ),
                ),
                ("address", models.CharField(blank=True, max_length=500, null=True)),
                ("include_sales_revenue", models.BooleanField(default=True)),
                ("include_impressions", models.BooleanField(default=True)),
                ("include_impressions_revenue", models.BooleanField(default=True)),
                (
                    "created_by",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "project",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="project.project",
                    ),
                ),
            ],
            options={
                "db_table": "report_templates",
            },
        ),
        migrations.AddField(
            model_name="report",
            name="template",
            field=models.ForeignKey(
                null=True,
                blank=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="report.reporttemplates",
            ),
        ),
    ]
