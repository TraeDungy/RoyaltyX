import os
import sys
from pathlib import Path
from dotenv import load_dotenv
import django
from django.core.management import call_command

BASE_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(BASE_DIR / "backend"))

load_dotenv(BASE_DIR / ".env.test")

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.royaltyx.test_settings")

django.setup()
# Run migrations so the in-memory SQLite database has the required tables
call_command("migrate", run_syncdb=True, verbosity=0)
