# Developer Guide

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

