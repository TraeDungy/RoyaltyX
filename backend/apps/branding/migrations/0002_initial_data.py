from django.db import migrations


def add_defaults(apps, schema_editor):
    PageCustomization = apps.get_model('branding', 'PageCustomization')
    defaults = {
        'landing': {'title': 'Welcome to RoyaltyX', 'subtitle': 'Manage your revenue effortlessly'},
        'login': {'title': 'Sign in to your account'},
        'signup': {'title': 'Create your account'},
    }
    for page, data in defaults.items():
        PageCustomization.objects.get_or_create(page=page, defaults={'data': data})


class Migration(migrations.Migration):

    dependencies = [
        ('branding', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(add_defaults)
    ]
