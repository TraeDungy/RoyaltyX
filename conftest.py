import os
import sys
from pathlib import Path
from dotenv import load_dotenv
import django
from django.core.management import call_command
from django.test.utils import setup_test_environment

BASE_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(BASE_DIR / "backend"))

load_dotenv(BASE_DIR / ".env.test")

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.royaltyx.test_settings")

django.setup()

setup_test_environment()
call_command("migrate", run_syncdb=True, verbosity=0)
