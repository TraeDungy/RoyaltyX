import base64
import os

from cryptography.fernet import Fernet
from django.conf import settings


# Generate key only once and store in settings.SECRET_KEY or env var
def get_fernet():
    """Return a ``Fernet`` instance using either ``FERNET_KEY`` or ``SECRET_KEY``.

    ``FERNET_KEY`` should be a 32 url‑safe base64 encoded value. If it is not
    provided, the function falls back to ``DJANGO_SECRET_KEY`` which is trimmed
    to 32 bytes and base64 encoded.
    """

    env_key = os.environ.get("FERNET_KEY")
    if env_key:
        return Fernet(env_key.encode())

    key = settings.SECRET_KEY[:32].encode()  # Ensure it's 32 bytes
    key = base64.urlsafe_b64encode(key)
    return Fernet(key)


def encrypt_token(token: str) -> str:
    return get_fernet().encrypt(token.encode()).decode()


def decrypt_token(token: str) -> str:
    return get_fernet().decrypt(token.encode()).decode()
