# Codebase Analysis
See [documentation/DOCUMENTATION_OVERVIEW.md](documentation/DOCUMENTATION_OVERVIEW.md) for a full index of guides.


This document provides an overview of how RoyaltyX is structured at a high level. It is intended for contributors who want to understand where the main features live before diving into the code.

## Backend

The backend is a Django project located in the `backend/` folder. Each major feature is implemented as a Django app under `backend/apps/`.

The full list of apps is:

- **admin_panel** – Custom views for the Django admin dashboard.
- **analytics** – Aggregates sales and impression data for charts and tables.
- **authentication** – Provides JWT auth, password management and OAuth callbacks.
- **data_imports** – Parses CSV/XLSX files for manual revenue uploads.
- **emails** – Celery tasks and templates for transactional emails.
- **fees** – Defines configurable project fees and calculates adjustments.
- **inbox** – Notification inbox for system alerts.
- **notifications** – Banner and email notifications for events.
- **oauth** – OAuth client logic for third‑party integrations.
- **payments** – Stripe integration, subscription management and webhook processing.
- **product** – Product catalogue models and API endpoints.
- **project** – Core project management models and permissions.
- **report** – PDF report generation and template management.
- **sources** – Syncs data from external platforms like YouTube and TikTok.
- **support** – Help desk tickets and FAQ articles.
- **user** – Custom user model and subscription plan tracking.

Shared utilities live in `backend/common`, providing helpers such as encryption tools, base API views and reusable management commands. Project configuration and Celery setup reside in `backend/royaltyx/`.

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

Docker compose files (`local.yml` and `production.yml`) orchestrate PostgreSQL, Redis, Celery workers, Nginx, and the frontend and backend containers. The `nginx/` directory contains the production configuration used by the `production.yml` stack. Environment variables are loaded from `.env` files and an optional `scripts/update-domain.sh` helper adjusts domain names during deployment. GitHub Actions run backend and frontend tests along with linting on every push.

For a more general description of folders see [CODEBASE_OVERVIEW.md](CODEBASE_OVERVIEW.md). The [Documentation Overview](documentation/DOCUMENTATION_OVERVIEW.md) lists every guide available under the `documentation/` directory.


