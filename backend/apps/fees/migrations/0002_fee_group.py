from django.db import migrations, models
import django.db.models.deletion

class Migration(migrations.Migration):
    dependencies = [
        ("fees", "0001_initial"),
        ("project", "0008_alter_projectuser_role"),
    ]

    operations = [
        migrations.CreateModel(
            name="FeeGroup",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("is_deleted", models.BooleanField(default=False)),
                ("name", models.CharField(max_length=100)),
                ("description", models.TextField(blank=True, null=True)),
                (
                    "project",
                    models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="fee_groups", to="project.project"),
                ),
            ],
            options={"db_table": "fee_group"},
        ),
        migrations.AddField(
            model_name="feerule",
            name="group",
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name="rules", to="fees.feegroup"),
        ),
        migrations.AddField(
            model_name="feerule",
            name="fixed_amount",
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
        migrations.AddField(
            model_name="feerule",
            name="is_percent",
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name="feerule",
            name="display_on_reports",
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name="feerule",
            name="rate",
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True),
        ),
    ]
