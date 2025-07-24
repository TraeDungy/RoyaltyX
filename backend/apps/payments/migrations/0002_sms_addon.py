from django.db import migrations, models
import os

def create_sms_addon(apps, schema_editor):
    AddOn = apps.get_model('payments', 'AddOn')
    if not AddOn.objects.filter(code='sms').exists():
        AddOn.objects.create(
            code='sms',
            stripe_price_id=os.environ.get('STRIPE_SMS_PRICE_ID', 'price_sms'),
            description='SMS updates'
        )

def delete_sms_addon(apps, schema_editor):
    AddOn = apps.get_model('payments', 'AddOn')
    AddOn.objects.filter(code='sms').delete()

class Migration(migrations.Migration):

    dependencies = [
        ('payments', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_sms_addon, delete_sms_addon),
    ]
