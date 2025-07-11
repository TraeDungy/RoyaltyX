from django.apps import AppConfig


class InboxConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.oauth.tiktok"
    verbose_name = "tiktok oauth"
    label = "tiktok_oauth"
