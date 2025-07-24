from django.db import migrations, models


def create_admin_role(apps, schema_editor):
    Role = apps.get_model('user', 'Role')
    Permission = apps.get_model('user', 'Permission')
    perm, _ = Permission.objects.get_or_create(
        code='admin_access', defaults={'description': 'Access admin panel'}
    )
    role, _ = Role.objects.get_or_create(
        name='Admin', defaults={'description': 'Administrators'}
    )
    role.permissions.add(perm)

class Migration(migrations.Migration):
    dependencies = [
        ('user', '0010_user_add_ons_user_stripe_subscription_item_id_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Role',
            fields=[
                (
                    'id',
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name='ID',
                    ),
                ),
                ('name', models.CharField(max_length=50, unique=True)),
                ('description', models.CharField(max_length=255)),
            ],
            options={'db_table': 'role'},
        ),
        migrations.AddField(
            model_name='user',
            name='roles',
            field=models.ManyToManyField(
                blank=True, related_name='users', to='user.role'
            ),
        ),
        migrations.AddField(
            model_name='role',
            name='permissions',
            field=models.ManyToManyField(
                blank=True, related_name='roles', to='user.permission'
            ),
        ),
        migrations.RunPython(create_admin_role),
    ]
