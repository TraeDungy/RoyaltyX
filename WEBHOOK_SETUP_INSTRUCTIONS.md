# Webhook Setup Instructions for RoyaltyX Stripe Integration

## Problem
Stripe webhooks are not reaching your local development server, so successful payments don't automatically update subscription plans.

## Solution Options

### Option 1: ngrok (Recommended for Development)

1. **Start ngrok:**
   ```bash
   ngrok http 8000
   ```

2. **Copy the HTTPS URL** (e.g., `https://abc123.ngrok.io`)

3. **Update Stripe webhook endpoint:**
   - Go to Stripe Dashboard → Developers → Webhooks
   - Add endpoint: `https://your-ngrok-url.ngrok.io/payments/stripe-webhook/`
   - Select events:
     - `checkout.session.completed`
     - `invoice.payment_failed`
     - `customer.subscription.deleted`
     - `customer.subscription.updated`

### Option 2: Stripe CLI

1. **Stop current Stripe CLI and restart:**
   ```bash
   stripe listen --forward-to 127.0.0.1:8000/payments/stripe-webhook/
   ```

## Manual Payment Processing

If webhooks fail, use this command to process payments manually:

```bash
docker-compose -f local.yml exec backend python manage.py shell -c "
import stripe
from django.contrib.auth import get_user_model
from apps.payments.stripe_service import StripeService

User = get_user_model()
user = User.objects.get(email='your-email@example.com')
session_id = 'cs_live_YOUR_SESSION_ID'
session = stripe.checkout.Session.retrieve(session_id)

if session.payment_status == 'paid':
    subscription = stripe.Subscription.retrieve(session.subscription)
    price_id = subscription['items']['data'][0]['price']['id']
    
    # Determine plan
    if price_id == 'price_1RjnbVC53oE1RMOr3mg8xoAn':
        plan = 'basic'
    elif price_id == 'price_1Rk6gAC53oE1RMOrQ14oT7w4':
        plan = 'premium'
    else:
        plan = 'basic'
    
    mock_session = {
        'id': session.id,
        'subscription': session.subscription,
        'metadata': {'user_id': str(user.id), 'plan': plan}
    }
    
    updated_user = StripeService.handle_successful_payment(mock_session)
    print(f'Updated user to: {updated_user.subscription_plan}')
"
```

## Testing Webhooks

Test webhook endpoint (for local testing only):
```bash
curl -X POST http://localhost:8000/api/v1/payments/test-webhook/ \
  -H "Content-Type: application/json" \
  -d '{"type": "checkout.session.completed", "data": {"object": {"id": "test"}}}'
```
This helper route is not included in production deployments.

## Production Setup

For production, set up a permanent webhook endpoint:
- Endpoint: `https://yourdomain.com/payments/stripe-webhook/`
- Same events as above
- Use production webhook secret in environment variables
