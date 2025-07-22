from django.conf import settings
from django.test import override_settings


@override_settings(INSTALLED_APPS=settings.INSTALLED_APPS + ['apps.inbox'])
def test_message_serializer_sanitizes_html():
    from apps.inbox.serializers import MessageSerializer

    serializer = MessageSerializer()
    cleaned = serializer.validate_text('<b>hi</b><script>alert(1)</script>')
    assert '<script>' not in cleaned
    assert '<b>hi</b>' in cleaned
