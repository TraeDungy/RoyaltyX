# Square Integration Guide

This guide explains how RoyaltyX connects to Square to fetch payment data automatically.

## OAuth Setup
1. Create a Square application to obtain the **Application ID** and **Client Secret**.
2. Add the following environment variables:
   ```bash
   REACT_APP_SQUARE_APPLICATION_ID=your-app-id
   SQUARE_APPLICATION_ID=your-app-id
   SQUARE_CLIENT_SECRET=your-client-secret
   SQUARE_REDIRECT_URI=https://<your-domain>/square-oauth-callback
   ```
3. Update the redirect URI in the Square dashboard to match `SQUARE_REDIRECT_URI`.

## How It Works
- Users link their Square account using OAuth.
- The backend stores the access and refresh tokens in the `Source` model.
- Scheduled Celery tasks (`task_fetch_square_sales` and `task_fetch_square_stats`) pull recent payments and store them as `ProductSale` records.
- Basic daily stats are saved into `ProductImpressions` for reporting.

## Useful Commands
Run the Square sync tasks manually:
```bash
docker-compose -f local.yml exec backend python manage.py shell -c "from apps.sources.utils.square_sync import fetch_square_sales, fetch_square_stats; fetch_square_sales(); fetch_square_stats()"
```
