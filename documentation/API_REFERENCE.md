# API Reference

This document lists all available API endpoints. Full interactive docs are available at `/docs/` when the server is running. The raw OpenAPI schema is served at `/schema/`.

To regenerate the schema, run:
```bash
python manage.py spectacular --file schema.yml
```

| Path | Methods | Description |
|------|---------|-------------|
| `/admin-panel/dashboard/stats/` | get | Get comprehensive dashboard statistics for admin panel |
| `/admin-panel/projects/stats/` | get | Get detailed project statistics |
| `/admin-panel/sources/stats/` | get | Get detailed source statistics |
| `/admin-panel/users/` | get | Get paginated list of all users |
| `/admin-panel/users/stats/` | get | Get detailed user statistics |
| `/analytics/` | get |  |
| `/analytics/export/` | get | Export analytics data as CSV. |
| `/analytics/forecasts/` | get | Retrieve analytics forecasts for the current project. |
| `/analytics/{product_id}/` | get |  |
| `/authentication/change-password/` | post |  |
| `/authentication/google-auth/` | post | Handle Google OAuth authentication |
| `/authentication/register/` | post |  |
| `/authentication/token/` | post | Takes a set of user credentials and returns an access and refresh JSON web |
| `/authentication/token/refresh/` | post | Takes a refresh type JSON web token and returns an access type JSON web |
| `/data_imports/datasets/{id}/` | get, patch |  |
| `/data_imports/files/` | get, post |  |
| `/data_imports/files/{id}/` | get, delete |  |
| `/data_imports/producers/` | post |  |
| `/emails/templates/` | get, post | List all templates or create a new one. |
| `/emails/templates/{id}/` | get, put, patch, delete | Retrieve, update or delete a template. |
| `/fees/report/` | get |  |
| `/fees/rules/` | get, post |  |
| `/fees/rules/{id}/` | get, put, delete |  |
| `/fees/types/` | get, post |  |
| `/fees/types/{id}/` | get, put, delete |  |
| `/notifications/` | get, post | GET: List notifications |
| `/oauth/google/exchange/` | post | POST: Get access and refresh token from Google OAuth2 by providing |
| `/oauth/tiktok/exchange/` | post | POST: Get access and refresh token from TikTok OAuth2 by providing |
| `/oauth/twitch/exchange/` | post | POST: Get access and refresh token from Twitch OAuth2 by providing |
| `/oauth/vimeo/exchange/` | post | Exchange authorization code for access token from Vimeo |
| `/payments/cancel-subscription/` | post | Cancel user's current subscription |
| `/payments/create-checkout-session/` | post | Create a Stripe checkout session for subscription upgrade |
| `/payments/subscription-status/` | get | Get detailed subscription status for the user |
| `/payments/update-subscription/` | post | Update an existing subscription with proration |
| `/payments/verify-session/` | get | Verify a checkout session and return the result |
| `/products/` | get, post |  |
| `/products/images/` | get, post |  |
| `/products/images/{id}/` | get, patch, delete |  |
| `/products/top-performing-by-impressions/` | get |  |
| `/products/top-performing-by-sales/` | get |  |
| `/products/{product_id}/` | get, put, delete |  |
| `/products/{product_id}/users` | get, post |  |
| `/products/{product_id}/users/{user_id}/` | get, put, delete |  |
| `/projects/` | get, post |  |
| `/projects/delete/` | delete |  |
| `/projects/info/` | get |  |
| `/projects/my-projects/` | get |  |
| `/projects/switch-project/` | post |  |
| `/projects/update/` | put |  |
| `/projects/users/` | get, post |  |
| `/projects/users/{id}` | get, delete | Retrieve a single ProjectUser by ID. |
| `/reports/` | get, post |  |
| `/reports/template/{id}/` | get, put, delete |  |
| `/reports/template/{id}/activate/` | post |  |
| `/reports/template/{id}/duplicate/` | post |  |
| `/reports/templates/` | get, post |  |
| `/reports/templates/upload/` | post |  |
| `/sources/` | get, post | GET: Returns a list of sources for this project. |
| `/sources/{id}/` | get | GET: Returns a single source |
| `/sources/{id}/youtube-analytics/` | get, put, delete | Return YouTube specific analytics for a source. |
| `/support/admin/stats/` | get | Get dashboard statistics for admin panel |
| `/support/admin/tickets/` | get | Admin view: List all support tickets with filtering |
| `/support/admin/tickets/{id}/` | get, put, patch | Admin view: Get and update ticket details |
| `/support/admin/tickets/{ticket_id}/assign/` | post | Assign a ticket to an admin |
| `/support/admin/tickets/{ticket_id}/take/` | post | Admin takes an unassigned ticket |
| `/support/help/chat/` | post | Simple OpenAI-powered help chat endpoint. |
| `/support/stats/` | get | Get support statistics for customer |
| `/support/tickets/` | get, post | Customer view: List their own tickets and create new ones |
| `/support/tickets/{id}/` | get | Customer view: Get details of their own ticket |
| `/support/tickets/{ticket_id}/messages/` | post | Create a new message in a support ticket |
| `/users/` | get |  |
| `/users/change-password/` | post | Change user password |
| `/users/get-my-info/` | get |  |
| `/users/subscription-plan/` | get | Get the current user's subscription plan |
| `/users/subscription-plan/available/` | get | Get all available subscription plans |
| `/users/subscription-plan/change/` | post | Change the current user's subscription plan. |
