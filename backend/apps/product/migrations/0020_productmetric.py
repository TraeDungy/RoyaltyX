from django.db import migrations, models
import django.db.models.deletion

class Migration(migrations.Migration):
    dependencies = [
        ("product", "0019_add_productimage"),
    ]

    operations = [
        migrations.CreateModel(
            name="ProductMetric",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("is_deleted", models.BooleanField(default=False)),
                ("name", models.CharField(max_length=255)),
                ("value", models.DecimalField(decimal_places=6, max_digits=30)),
                ("period_start", models.DateField()),
                ("period_end", models.DateField()),
                ("from_file", models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to="data_imports.file")),
                ("product", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="product.product")),
            ],
            options={"db_table": "product_metric"},
        ),
    ]
