import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ('user', '0009_user_phone_number'),
        ('project', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Milestone',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_deleted', models.BooleanField(default=False)),
                ('metric', models.CharField(max_length=50, choices=[('impressions','Impressions'),('sales','Sales'),('rentals','Rentals'),('views','Views'),('downloads','Downloads'),('royalty_revenue','Royalty Revenue'),('impression_revenue','Impression Revenue')])),
                ('threshold', models.DecimalField(max_digits=20, decimal_places=2)),
                ('is_achieved', models.BooleanField(default=False)),
                ('achieved_at', models.DateTimeField(blank=True, null=True)),
                ('notify_email', models.BooleanField(default=True)),
                ('notify_text', models.BooleanField(default=False)),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='project.project')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='milestones', to='user.user')),
            ],
            options={'db_table': 'milestone'},
        ),
    ]
