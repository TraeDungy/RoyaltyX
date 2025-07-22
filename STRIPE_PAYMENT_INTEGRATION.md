# Stripe Payment Integration Documentation

This document describes the complete Stripe payment integration for the RoyaltyX subscription system.

## Overview

The payment system integrates Stripe for handling recurring subscriptions with automatic billing, payment failure handling, and webhook processing.

## Backend Implementation

### 1. Database Schema Updates

**User Model Extensions:**
```python
# New fields added to User model
stripe_customer_id = models.CharField(max_length=255, null=True, blank=True)
stripe_subscription_id = models.CharField(max_length=255, null=True, blank=True)
subscription_status = models.CharField(max_length=50, choices=SUBSCRIPTION_STATUS_CHOICES, default="inactive")
subscription_current_period_end = models.DateTimeField(null=True, blank=True)
grace_period_end = models.DateTimeField(null=True, blank=True)
payment_failure_count = models.IntegerField(default=0)
```

**Subscription Status Options:**
- `inactive` - No active subscription
- `active` - Subscription is active and paid
- `past_due` - Payment failed, in grace period
- `canceled` - Subscription cancelled
- `incomplete` - Payment incomplete

### 2. Stripe Service Layer

**File:** `backend/apps/payments/stripe_service.py`

**Key Functions:**
- `create_customer()` - Creates Stripe customer
- `create_checkout_session()` - Creates payment session
- `handle_successful_payment()` - Processes successful payments
- `handle_payment_failed()` - Handles payment failures
- `handle_subscription_deleted()` - Processes cancellations
- `cancel_subscription()` - Cancels active subscriptions

### 3. API Endpoints

**Payment Endpoints:**
- `POST /api/v1/payments/create-checkout-session/` - Create Stripe checkout
- `POST /api/v1/payments/cancel-subscription/` - Cancel subscription
- `POST /api/v1/payments/update-subscription/` - Prorated plan or add-on changes
- `GET /api/v1/payments/subscription-status/` - Get detailed status
- `GET /api/v1/payments/verify-session/` - Verify payment session
- `POST /api/v1/payments/stripe-webhook/` - Handle Stripe webhooks

**Updated User Endpoints:**
- `POST /api/v1/users/subscription-plan/change/` - Now handles payment flow

### 4. Webhook Handling

**Supported Events:**
- `checkout.session.completed` - Payment successful
- `invoice.payment_failed` - Payment failed
- `customer.subscription.deleted` - Subscription cancelled
- `customer.subscription.updated` - Status changes

**Security:**
- Webhook signature verification
- Idempotent processing
- Error handling and logging

## Frontend Implementation

### 1. Payment API Integration

**File:** `frontend/src/modules/account/api/payments.js`

**Functions:**
- `createCheckoutSession(plan)` - Initiates payment
- `cancelSubscription()` - Cancels subscription
- `getSubscriptionStatus()` - Gets detailed status
- `verifySession(sessionId)` - Verifies payment

### 2. Updated Membership Page

**File:** `frontend/src/modules/account/pages/Membership.jsx`

**New Features:**
- Stripe checkout integration
- Payment return handling
- Real-time status updates
- Error handling and notifications

**Payment Flow:**
1. User selects plan → Confirmation dialog
2. Confirm → Create checkout session
3. Redirect to Stripe checkout
4. Return with success/cancel status
5. Verify payment and update UI

### 3. Settings Integration

**Subscription Tab:** Shows current plan with upgrade options

## Environment Configuration

**Required Environment Variables:**
```bash
# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_BASIC_PRICE_ID=price_...
STRIPE_PREMIUM_PRICE_ID=price_...
```

## Payment Flow Architecture

### Upgrade Flow (Free → Paid)
1. User clicks "Upgrade" → Confirmation dialog
2. User confirms → `createCheckoutSession()` API call
3. Backend creates Stripe session → Returns checkout URL
4. Frontend redirects to Stripe checkout
5. User completes payment → Stripe webhook fired
6. Webhook updates user subscription → User redirected back
7. Frontend verifies session → Shows success message

### Downgrade Flow (Paid → Free)
1. User clicks "Downgrade" → Confirmation dialog
2. User confirms → Direct API call to cancel subscription
3. Backend cancels Stripe subscription → Updates user plan
4. Frontend shows success message → UI updates

### Plan Change Flow (Paid → Paid)
1. User chooses a new plan or add-ons
2. Frontend calls `update-subscription` API
3. Stripe prorates the subscription and immediately invoices
4. Backend updates local subscription data
5. Frontend shows updated status

### Payment Failure Flow
1. Stripe payment fails → Webhook fired
2. Backend updates status to `past_due`
3. User gets email notification (TODO)
4. Grace period starts (7 days)
5. If not resolved → Automatic downgrade to free

## Security Features

### Backend Security
- JWT authentication required for all endpoints
- Stripe webhook signature verification
- Input validation and sanitization
- Error handling without information leakage

### Frontend Security
- Secure token storage
- HTTPS-only payment processing
- No sensitive data stored locally
- Proper error handling

## Testing Strategy

### Backend Testing
- Unit tests for Stripe service functions
- Integration tests for webhook handling
- API endpoint testing
- Payment flow testing

### Frontend Testing
- Component testing for payment flows
- Integration testing for API calls
- User flow testing
- Error scenario testing

## Deployment Considerations

### Stripe Configuration
1. Create Stripe products for Basic and Premium plans
2. Get price IDs for monthly recurring billing
3. Set up webhook endpoint in Stripe dashboard
4. Configure webhook events to listen for
5. Add environment variables to production

### Webhook Setup
**Endpoint:** `https://yourdomain.com/api/v1/payments/stripe-webhook/`

**Events to Subscribe:**
- `checkout.session.completed`
- `invoice.payment_failed`
- `customer.subscription.deleted`
- `customer.subscription.updated`

### Production Checklist
- [ ] Stripe live keys configured
- [ ] Webhook endpoint accessible
- [ ] SSL certificate valid
- [ ] Environment variables set
- [ ] Database migrations applied
- [ ] Error monitoring configured

## Error Handling

### Common Scenarios
1. **Payment Declined:** User sees error, can retry
2. **Network Issues:** Graceful degradation, retry logic
3. **Webhook Failures:** Automatic retries, manual reconciliation
4. **Invalid Plans:** Validation prevents invalid requests

### Monitoring
- Stripe dashboard for payment monitoring
- Application logs for webhook processing
- User feedback for payment issues
- Database consistency checks

## Future Enhancements

### Phase 1 Improvements
- Email notifications for payment events
- Payment method management
- Billing history page

### Implemented Enhancements
- Prorated billing for plan changes with the `update-subscription` endpoint

### Phase 2 Features
- Annual billing discounts
- Team/organization billing
- Usage-based billing
- Custom enterprise plans

### Phase 3 Advanced
- Multiple payment methods
- International payment support
- Tax calculation integration
- Advanced analytics

## Troubleshooting

### Common Issues
1. **Webhook not firing:** Check endpoint URL and SSL
2. **Payment not updating:** Verify webhook signature
3. **User stuck in pending:** Manual status reconciliation
4. **Duplicate charges:** Check idempotency keys

### Debug Tools
- Stripe dashboard webhook logs
- Application server logs
- Database subscription status
- Frontend network requests

## Support Procedures

### Payment Issues
1. Check Stripe dashboard for payment status
2. Verify webhook delivery and processing
3. Check user subscription status in database
4. Manual reconciliation if needed

### Refund Process
1. Process refund through Stripe dashboard
2. Update user subscription status
3. Send confirmation to user
4. Log transaction for records

This integration provides a robust, scalable payment system that handles the complexities of subscription billing while maintaining a smooth user experience.
