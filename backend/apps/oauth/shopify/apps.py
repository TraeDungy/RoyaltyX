from django.apps import AppConfig


class ShopifyConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.oauth.shopify"
    verbose_name = "shopify oauth"
    label = "shopify_oauth"
