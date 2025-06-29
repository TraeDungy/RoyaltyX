# Generated manually

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("sources", "0006_source_account_name"),
    ]

    operations = [
        migrations.AddField(
            model_name="source",
            name="channel_id",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
