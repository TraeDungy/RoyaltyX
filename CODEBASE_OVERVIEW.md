# Codebase Overview

This document summarizes the overall architecture of the RoyaltyX project. It is intended as a starting point for new contributors who want a high level understanding of how the system is organized.

## Repository Layout

```
RoyaltyX/
├── backend/          # Django backend source code
│   ├── apps/         # Django apps providing core features
│   ├── royaltyx/     # Project settings and Celery config
│   ├── media/        # Uploaded files (ignored in git)
│   ├── Dockerfile.*  # Backend Docker images
│   └── requirements.txt
├── frontend/         # React application
│   ├── src/          # Source code for UI components and pages
│   └── Dockerfile.*  # Frontend Docker images
├── nginx/            # Nginx configuration for production
├── local.yml         # Docker compose for development
├── production.yml    # Docker compose for production
└── documentation/    # Additional markdown guides
```

### Backend Apps

The `backend/apps` folder contains Django apps for different domains:

- **authentication** – JWT auth endpoints and OAuth logic
- **user** – user profiles and subscription plans
- **payments** – Stripe integration and webhook handling
- **analytics** – metrics calculations and reporting helpers
- **sources** – management of revenue sources such as YouTube
- **report** – PDF report generation and scheduling
- **emails** – templated email sending via Celery

Each app has its own models, serializers, views and tests. Celery tasks live alongside the apps to keep the logic close to the models they act on.

### Frontend

The React code in `frontend/src` is organised into feature modules under `modules/` and shared components under `components/`. Tests use React Testing Library and run with `npm test`.

### Infrastructure

Docker compose files spin up PostgreSQL, Redis, Celery workers, and the frontend and backend services. The production configuration also includes Nginx and Certbot for HTTPS.

### Tests

Backend tests run with Django's test runner. Frontend tests run via `react-scripts`. Continuous integration uses GitHub Actions to execute both suites on every push.

## Related Documentation

Additional guides live in the `documentation/` directory and as Markdown files in the repository root. See [README.md](README.md) for setup instructions, payment integration details and more.
