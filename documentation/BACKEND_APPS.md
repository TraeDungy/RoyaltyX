# Backend App Reference

This document lists the Django apps included in the `backend/apps` directory and briefly describes what each one does.

| App | Purpose |
| --- | ------- |
| **admin_panel** | Minimal custom views for the Django admin dashboard. |
| **analytics** | Aggregates sales and impression data for charts and tables. |
| **authentication** | JWT login endpoints and optional OAuth helpers. |
| **data_imports** | Handles CSV/XLSX uploads and import templates. |
| **emails** | Manages templated email sending through Celery tasks. |
| **fees** | Defines project specific fees and calculates adjustments. |
| **inbox** | Notification inbox for system alerts. |
| **notifications** | Banner and email notifications for events. |
| **oauth** | OAuth client logic for third‑party integrations. |
| **payments** | Stripe integration and webhook processing. |
| **product** | Product catalogue models and API endpoints. |
| **project** | Core project management models and permissions. |
| **report** | PDF report generation and template management. |
| **sources** | Syncs data from external platforms such as YouTube. |
| **support** | Help desk tickets and public FAQ articles. |
| **user** | Custom user model and subscription plans. |

Each app contains its own models, serializers, views and tests. Celery tasks live alongside the apps to keep the business logic close to the models they act on.

