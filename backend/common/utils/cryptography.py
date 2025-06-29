import base64

from cryptography.fernet import Fernet
from django.conf import settings


# Generate key only once and store in settings.SECRET_KEY or env var
def get_fernet():
    key = settings.SECRET_KEY[:32].encode()  # Ensure it's 32 bytes
    key = base64.urlsafe_b64encode(key)
    return Fernet(key)


def encrypt_token(token: str) -> str:
    return get_fernet().encrypt(token.encode()).decode()


def decrypt_token(token: str) -> str:
    return get_fernet().decrypt(token.encode()).decode()
