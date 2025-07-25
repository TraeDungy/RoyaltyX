# Subscription Plans API Documentation
See [Documentation Overview](../documentation/DOCUMENTATION_OVERVIEW.md) for a full index of guides.

This document describes the subscription plan functionality that has been integrated into the RoyaltyX backend.

## Overview

The system supports four subscription plans:
- **Discovery** (30-day free trial, then $19/mo or $199/yr)
- **Professional** ($49/mo or $499/yr)
- **Premium** ($99/mo or $999/yr)
- **Enterprise** (contact for pricing)

## Database Changes

A new field `subscription_plan` has been added to the User model with the following characteristics:
- Type: CharField with choices
- Default: "discovery"
- Max length: 15 characters
- Choices: discovery, professional, premium, enterprise

## API Endpoints

All subscription plan endpoints require authentication (Bearer token).

### 1. Get Current User's Subscription Plan

**GET** `/users/subscription-plan/`

**Response:**
```json
{
    "subscription_plan": "discovery"
}
```

### 2. Get Available Subscription Plans

**GET** `/users/subscription-plan/available/`

**Response:**
```json
{
    "plans": [
        {"value": "discovery", "label": "Discovery"},
        {"value": "professional", "label": "Professional"},
        {"value": "premium", "label": "Premium"},
        {"value": "enterprise", "label": "Enterprise"}
    ]
}
```

### 3. Change Subscription Plan

**POST** `/users/subscription-plan/change/`

**Request Body:**
```json
{
    "subscription_plan": "professional"
}
```

**Success Response:**
```json
{
    "message": "Subscription plan successfully changed to professional",
    "subscription_plan": "professional"
}
```

**Error Response (Invalid Plan):**
```json
{
    "error": "Invalid subscription plan. Valid options are: discovery, professional, premium, enterprise"
}
```

## Usage Examples

### Using curl

1. **Get current subscription plan:**
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:8000/users/subscription-plan/
```

2. **Change to premium plan:**
```bash
curl -X POST \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"subscription_plan": "premium"}' \
     http://localhost:8000/users/subscription-plan/change/
```

3. **Get available plans:**
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:8000/users/subscription-plan/available/
```

### Using JavaScript/Fetch

```javascript
// Get current subscription plan
const getCurrentPlan = async () => {
    const response = await fetch('/users/subscription-plan/', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    return data.subscription_plan;
};

// Change subscription plan
const changePlan = async (newPlan) => {
    const response = await fetch('/users/subscription-plan/change/', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            subscription_plan: newPlan
        })
    });
    return await response.json();
};
```

## Default Behavior

- New users are automatically assigned the "discovery" subscription plan
- The subscription plan is included in the user info endpoint (`/users/get-my-info/`)
- All subscription plan operations require user authentication

## Testing

Comprehensive tests have been implemented in `apps/user/tests.py` covering:
- Default subscription plan assignment
- Getting current subscription plan
- Changing subscription plans
- Invalid plan validation
- Authentication requirements
- Integration with user info endpoint

Run tests with:
```bash
docker-compose -f local.yml exec backend python manage.py test apps.user.tests.SubscriptionPlanTests
```

## Migration

The subscription plan field was added via migration `0007_user_subscription_plan.py`. This migration:
- Adds the `subscription_plan` field to existing users with default value "discovery"
- Does not require any data migration as the default value is applied automatically

## Future Enhancements

This implementation provides the foundation for subscription plans. Future enhancements could include:
- Payment integration
- Plan-specific feature restrictions
- Subscription history tracking
- Plan expiration dates
- Automatic plan downgrades/upgrades
