# Codebase Analysis
See [documentation/DOCUMENTATION_OVERVIEW.md](documentation/DOCUMENTATION_OVERVIEW.md) for a full index of guides.


This document provides an overview of how RoyaltyX is structured at a high level. It is intended for contributors who want to understand where the main features live before diving into the code.

## Backend

The backend is a Django project located in the `backend/` folder. Each major feature is encapsulated in a Django app under `backend/apps/`.

- **authentication** – Provides JWT auth, password management and OAuth callbacks.
- **user** – Custom user model and subscription plan tracking.
- **payments** – Stripe integration, subscription management and webhook processing.
- **analytics** – Aggregates product sales and impressions, storing summary records for quick dashboards.
- **sources** – Handles synchronization with third‑party platforms like YouTube, TikTok and Vimeo.
- **data_imports** – Parses CSV/XLSX files for manual revenue uploads.
- **emails** – Celery tasks and templates for transactional emails.
- **report** – PDF report generation and template management.
- **support** – In‑app help desk tickets.

Celery workers and beat tasks are configured in `backend/royaltyx/` and run side by side with the Django application. Tests live next to the code in each app.

## Frontend

The React application resides in `frontend/`. Source files are grouped by feature within `src/modules/`:

- **account** – Billing history, payment methods and membership pages.
- **analytics** – Dashboard components and charts.
- **management** – Admin style pages for producers, fees and settings.
- **projects** – Create and manage projects and products.
- **reports** – PDF template builder and report list pages.
- **sources** – Connect external platforms and upload data manually.
- **support** – Customer support page and help resources.

Shared components live under `src/modules/common`. The project uses React Router for navigation and Material‑UI for styling. Tests use React Testing Library.

## Infrastructure

Docker compose files (`local.yml` and `production.yml`) orchestrate PostgreSQL, Redis, Celery workers, Nginx, and both the frontend and backend services. GitHub Actions run the test suites and linting on every push.

For a more general description of folders see [CODEBASE_OVERVIEW.md](CODEBASE_OVERVIEW.md). The [Documentation Overview](documentation/DOCUMENTATION_OVERVIEW.md) lists every guide available under the `documentation/` directory.


