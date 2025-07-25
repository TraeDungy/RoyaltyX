# Developer Guide
See [Documentation Overview](DOCUMENTATION_OVERVIEW.md) for a list of all guides.


This guide complements the existing [AGENTS.md](../AGENTS.md) instructions.
It highlights common tasks and the tooling used in this repository.

## Linting

- **Python**: Ruff is configured via `backend/pyproject.toml`. Run `ruff check .` from the `backend/` directory.
- **JavaScript**: ESLint rules live in `frontend/.eslintrc.json`. Use `npm run lint` from `frontend/`.

Both linters enforce a trailing newline at the end of every file to avoid
shell prompt glitches.

## Running Tests

Follow `AGENTS.md` for the full workflow. Typically you can run:

```bash
# Backend
cd backend && python manage.py test

# Frontend
cd frontend && npm test -- --watchAll=false
```

## Helpful Scripts

The `scripts/` directory contains small utilities used during deployment.
`update-domain.sh` rewrites Nginx configs and `.env` values when you move the
application to a custom domain:

```bash
./scripts/update-domain.sh yourdomain.com
```

## Debugging Data Imports

During development you may want verbose logs from the data import tasks.
Set `DJANGO_LOG_LEVEL=DEBUG` before running the backend to capture detailed
messages, especially when parsing report files. See
[Data Import Debugging](DATA_IMPORT_DEBUGGING.md) for troubleshooting advice.



