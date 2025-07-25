# API Overview
See [Documentation Overview](DOCUMENTATION_OVERVIEW.md) for a list of all guides.


This document lists the primary REST endpoints exposed by RoyaltyX. The complete OpenAPI specification is stored in [../backend/schema.yml](../backend/schema.yml) and is served live at `/docs/` when the application is running.

## Authentication
- `POST /authentication/token/` – Obtain JWT access and refresh tokens
- `POST /authentication/token/refresh/` – Refresh access token
- `POST /authentication/register/` – Create a new user account
- `POST /authentication/change-password/` – Change the current password

## Payments
- `POST /payments/create-checkout-session/` – Start a Stripe checkout
- `POST /payments/cancel-subscription/` – Cancel the active subscription
- `POST /payments/update-subscription/` – Change plan or add‑ons
- `GET  /payments/subscription-status/` – Retrieve subscription state
- `GET  /payments/verify-session/` – Verify a Stripe checkout session
- `GET  /payments/add-ons/` – List available subscription add‑ons

## Analytics
- `GET  /analytics/` – Project analytics overview
- `GET  /analytics/<product_id>/` – Analytics for a single product
- `GET  /analytics/export/` – Export analytics as CSV
- `GET  /analytics/forecasts/` – Retrieve stored forecasts

## Sources
- `GET  /sources/` – List all data sources for the project
- `POST /sources/` – Create a new source
- `GET  /sources/{id}/` – Retrieve a specific source
- `PUT  /sources/{id}/` – Update a source
- `DELETE /sources/{id}/` – Remove a source
- `GET  /sources/{id}/youtube-analytics/` – Fetch YouTube stats for a source

## Email Templates
- `GET  /emails/templates/` – List email templates
- `POST /emails/templates/` – Create a new template
- `GET  /emails/templates/{id}/` – Retrieve, update or delete a template
- `POST /emails/templates/generate/` – Generate a template with OpenAI
