# Deep Codebase Analysis
See [Documentation Overview](DOCUMENTATION_OVERVIEW.md) for a list of all guides.

This document provides a deeper summary of how the RoyaltyX project is organised. It
combines information about the Django backend apps and the React frontend modules.

## Backend Apps

The `backend/apps/` folder contains isolated Django apps. Each app focuses on a
specific domain. Below is a short description of every folder:

| App | Purpose |
| --- | ------- |
| **admin_panel** | Views used by the internal Django admin panel. |
| **analytics** | Aggregates sales and impression data for dashboard metrics. |
| **authentication** | JWT auth endpoints and third‑party OAuth callbacks. |
| **data_imports** | CSV/XLSX importers for manual revenue uploads. |
| **emails** | Email templates and Celery tasks for transactional emails. |
| **fees** | Configurable fee rules applied to revenue events. |
| **inbox** | Basic in‑app messaging and notifications. |
| **notifications** | Manages user notifications and settings. |
| **oauth** | OAuth flows for Google, TikTok, Twitch and Vimeo. |
| **payments** | Stripe integration, webhook handling and plan logic. |
| **product** | Models for products, files and media. |
| **project** | Multi‑project support and permissions. |
| **report** | PDF report generation and template management. |
| **sources** | Synchronises data from external platforms like YouTube. |
| **support** | Simple help desk and FAQ system. |
| **user** | Custom user model and profile management. |

Celery workers and beat tasks are configured in `backend/royaltyx/` and run
alongside the Django application.

## Frontend Modules

The React application under `frontend/` mirrors the backend structure. Feature
modules live in `src/modules/`:

| Module | Description |
| ------ | ----------- |
| **account** | Billing history and membership pages. |
| **admin_panel** | Admin‑only dashboard views. |
| **analytics** | Charts and widgets for revenue metrics. |
| **authentication** | Login, registration and OAuth screens. |
| **common** | Reusable components shared across the app. |
| **content** | Media management pages and upload forms. |
| **dashboard** | Landing dashboard after login. |
| **global** | Global state (context providers, themes). |
| **management** | Admin style pages for producers and settings. |
| **members** | Team member management UI. |
| **oauth** | Handles frontend pieces of OAuth flows. |
| **products** | Product listing and detail pages. |
| **projects** | Manage projects and assign users. |
| **reports** | PDF template builder and reports list. |
| **sources** | Connect external platforms and manual uploads. |
| **support** | Customer support and help resources. |
| **white_label** | White‑label branding options. |

The modules communicate with the backend via Axios-based API helpers located in
each module’s `api/` directory.

## Tests

- **Backend tests** live next to the Django apps and run with `pytest`.
- **Frontend tests** use React Testing Library and run with `npm test`.

Both suites execute in continuous integration via GitHub Actions.

## Further Reading

- [CODEBASE_OVERVIEW.md](../CODEBASE_OVERVIEW.md) – High level repository layout.
- [CODEBASE_ANALYSIS.md](../CODEBASE_ANALYSIS.md) – Shorter summary of major features.

