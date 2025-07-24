from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0010_user_add_ons_user_stripe_subscription_item_id_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='phone_number',
            field=models.CharField(max_length=20, null=True, blank=True),
        ),
    ]
