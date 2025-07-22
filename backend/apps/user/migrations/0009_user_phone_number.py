from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('user', '0008_user_grace_period_end_user_payment_failure_count_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='phone_number',
            field=models.CharField(max_length=20, null=True, blank=True),
        ),
    ]
