from django.db import migrations, models

class Migration(migrations.Migration):
    dependencies = [
        ('user', '0010_user_add_ons_user_stripe_subscription_item_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='subscription_plan',
            field=models.CharField(
                max_length=15,
                choices=[
                    ('discovery', 'Discovery'),
                    ('professional', 'Professional'),
                    ('premium', 'Premium'),
                    ('enterprise', 'Enterprise'),
                ],
                default='discovery',
            ),
        ),
    ]

