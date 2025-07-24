# Complete Stripe Integration Setup Guide

## Current Issue
- Payments succeed in Stripe ✅
- Webhooks don't reach your local server ❌
- Subscription plans don't update ❌

## Development Setup (Local Testing)

### Option 1: ngrok (Recommended)
```bash
# 1. Start ngrok
ngrok http 8000

# 2. Copy the HTTPS URL (e.g., https://abc123.ngrok.io)

# 3. In Stripe Dashboard → Developers → Webhooks:
#    - Add endpoint: https://abc123.ngrok.io/payments/stripe-webhook/
#    - Select events: checkout.session.completed, invoice.payment_failed, 
#      customer.subscription.deleted, customer.subscription.updated
```

### Option 2: Stripe CLI
```bash
# Stop current Stripe CLI and restart:
stripe listen --forward-to 127.0.0.1:8000/payments/stripe-webhook/
```

## Production Setup

### 1. Stripe Dashboard Webhook
- **URL**: `https://yourdomain.com/payments/stripe-webhook/`
- **Events**: Same as development
- **No ngrok/Stripe CLI needed**

### 2. Environment Variables
```bash
# Production .env
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_... (from production webhook)
```

## Checkout Flow (No Callback URLs Needed)

### Current Implementation ✅
1. User clicks upgrade → API creates checkout session
2. User redirected to Stripe checkout
3. User pays → Stripe webhook fired automatically
4. Backend processes webhook → Updates subscription
5. User redirected back to success URL

### Success/Cancel URLs (Already Configured)
```javascript
// In your StripeService.create_checkout_session():
success_url: "http://localhost:3000/account/membership?session_id={CHECKOUT_SESSION_ID}&status=success"
cancel_url: "http://localhost:3000/account/membership?status=cancelled"
```

## Manual Processing (Backup Solution)

If webhooks fail, process payments manually:

```bash
docker-compose -f local.yml exec backend python manage.py shell -c "
import stripe
from django.contrib.auth import get_user_model
from apps.payments.stripe_service import StripeService

User = get_user_model()
user = User.objects.get(email='nenadblagovcanin2@gmail.com')

# Replace with your actual session ID
session_id = 'cs_live_YOUR_SESSION_ID'
session = stripe.checkout.Session.retrieve(session_id)

if session.payment_status == 'paid':
    subscription = stripe.Subscription.retrieve(session.subscription)
    price_id = subscription['items']['data'][0]['price']['id']
    
    # Auto-detect plan
    if price_id == 'price_1RjnbVC53oE1RMOr3mg8xoAn':
        plan = 'professional'
    elif price_id == 'price_1Rk6gAC53oE1RMOrQ14oT7w4':
        plan = 'premium'
    else:
        plan = 'discovery'
    
    mock_session = {
        'id': session.id,
        'subscription': session.subscription,
        'metadata': {'user_id': str(user.id), 'plan': plan}
    }
    
    updated_user = StripeService.handle_successful_payment(mock_session)
    print(f'✅ Updated user to: {updated_user.subscription_plan}')
else:
    print('❌ Payment not completed')
"
```

## Summary

### Development:
- ✅ **Webhook forwarding required** (ngrok or Stripe CLI)
- ✅ **No callback URLs needed** in Stripe
- ✅ **Manual processing available** as backup

### Production:
- ✅ **Webhook endpoint in Stripe dashboard required**
- ✅ **No ngrok/Stripe CLI needed**
- ✅ **No callback URLs needed** in Stripe
- ✅ **Automatic webhook processing**

## Next Steps

1. **Immediate**: Provide your latest checkout session ID for manual processing
2. **Development**: Set up ngrok or Stripe CLI webhook forwarding
3. **Production**: Add webhook endpoint to Stripe dashboard when deploying
