# Detailed Codebase Analysis
See [documentation/DOCUMENTATION_OVERVIEW.md](documentation/DOCUMENTATION_OVERVIEW.md) for a full index of guides.


This guide expands on [CODEBASE_ANALYSIS.md](CODEBASE_ANALYSIS.md) with a more in‑depth look at each part of the repository. Use it when you need to understand how the pieces fit together before adding new features.

## Backend Structure

The Django project lives in `backend/` and is organised into reusable apps inside `backend/apps/`.

### apps/authentication
Handles user registration, login via JWT and optional OAuth callbacks. Provides password reset endpoints and basic profile views.

### apps/user
Extends the default Django user model with subscription information. Manages subscription plan choices and exposes endpoints to fetch or update the plan.

### apps/payments
Wraps Stripe billing. Implements checkout session creation, subscription updates, webhook handling and invoice retrieval. Celery tasks send emails on failed payments or cancellations.

### apps/analytics
Calculates revenue and impression metrics from `ProductSale` and `ProductImpressions` models. Aggregates data per project and exposes API endpoints for dashboards.

### apps/sources
Synchronises external platforms such as YouTube and TikTok. Also supports manual CSV/XLSX data uploads through the `data_imports` app.

### apps/report
Generates PDF reports using configurable templates. Works with the `emails` app to deliver reports via email if required.

### Other apps
`admin_panel`, `support`, `fees`, `notifications`, `inbox`, `project` and `product` provide admin tools, help desk features, fee calculation and product management. Each app keeps its own serializers, views and tests close to the models they operate on.

### royaltyx/
Contains project settings, Celery configuration and the Django entrypoint. Beat tasks schedule synchronisation jobs and payment checks.

## Frontend Structure

The React code is stored in `frontend/`. Pages are grouped by feature under `src/modules/`.

- **account** – membership page, billing history and payment method management.
- **analytics** – dashboard charts and tables showing project performance.
- **management** – admin style screens for producers, fees and settings.
- **projects** – create and manage projects and products.
- **reports** – PDF template customiser and report listings.
- **sources** – connect third‑party platforms and upload manual data files.
- **support** – help centre and contact forms.

Shared UI components live under `src/modules/common`. Routing is handled by React Router and Material‑UI provides styling components.

## Infrastructure

Docker compose files (`local.yml` and `production.yml`) start PostgreSQL, Redis, Celery workers, the Django backend and the React frontend. Nginx serves both applications in production. GitHub Actions under `.github/workflows/` run tests and linting for every push.

## Testing

Backend tests use Django's test runner and can be invoked with `python manage.py test` inside `backend/`. Frontend tests run with `npm test` inside `frontend/`. The `conftest.py` file configures Django for running tests outside of Docker.

## Where to Go Next

- [CODEBASE_OVERVIEW.md](CODEBASE_OVERVIEW.md) – quick look at the folder structure.
- [documentation/BACKEND_APPS.md](documentation/BACKEND_APPS.md) – table listing every Django app.
- [documentation/DEVELOPER_GUIDE.md](documentation/DEVELOPER_GUIDE.md) – tips for linting and test commands.

