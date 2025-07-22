from django.apps import AppConfig


class VimeoOAuthConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.oauth.vimeo"
    verbose_name = "vimeo oauth"
    label = "vimeo_oauth"
