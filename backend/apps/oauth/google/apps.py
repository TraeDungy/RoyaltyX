from django.apps import AppConfig


class InboxConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.oauth.google"
    verbose_name = "google oauth"
    label = "google_oauth"
