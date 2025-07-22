# PayPal Data Integration

This document describes the automated PayPal data import added to RoyaltyX.

## Overview

PayPal transactions can now be pulled directly from the PayPal Reporting API. The
integration uses OAuth tokens stored in the `Source` model. Celery periodic tasks
collect new transactions every 24 hours.

## Environment Variables

Add these keys to your `.env` file:

```bash
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
```

## Backend Implementation

- **New platform type** `paypal` added to `Source` model.
- **Service** `paypal_service.py` communicates with the PayPal API.
- **Sync job** `paypal_sync.py` fetches daily transactions and stores them as
  `ProductSale` records.
- **Celery task** `task_fetch_paypal_transactions` scheduled every 24 hours.

## Usage

1. Create a PayPal source via `/sources/` with the appropriate access token.
2. The background task will automatically import transactions.
3. Transactions appear in analytics alongside other platform data.
