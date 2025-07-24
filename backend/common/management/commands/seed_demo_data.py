from pathlib import Path

from django.core.management import BaseCommand, call_command


class Command(BaseCommand):
    help = "Load demo data from initial_data.json"

    def handle(self, *args, **options):
        base_dir = Path(__file__).resolve().parents[3]
        data_file = base_dir / "initial_data.json"
        if not data_file.exists():
            self.stderr.write(self.style.ERROR(f"{data_file} not found"))
            return
        self.stdout.write(self.style.SUCCESS("Loading demo data..."))
        call_command("loaddata", str(data_file))
        self.stdout.write(self.style.SUCCESS("Demo data loaded."))

