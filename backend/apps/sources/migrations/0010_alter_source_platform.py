from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('sources', '0009_alter_source_platform'),
    ]

    operations = [
        migrations.AlterField(
            model_name='source',
            name='platform',
            field=models.CharField(choices=[('youtube', 'YouTube'), ('google_ads', 'Google Ads'), ('facebook', 'Facebook'), ('amazon', 'Amazon'), ('tiktok', 'TikTok'), ('twitch', 'Twitch'), ('paypal', 'PayPal')], max_length=50),
        ),
    ]
