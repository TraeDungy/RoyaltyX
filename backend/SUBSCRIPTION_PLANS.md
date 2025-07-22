# Subscription Plans API Documentation

This document describes the subscription plan functionality that has been integrated into the RoyaltyX backend.

## Overview

The system supports three subscription plans:
- **Free** (default for new users)
- **Basic**
- **Premium**

## Database Changes

A new field `subscription_plan` has been added to the User model with the following characteristics:
- Type: CharField with choices
- Default: "free"
- Max length: 10 characters
- Choices: free, basic, premium

## API Endpoints

All subscription plan endpoints require authentication (Bearer token).

### 1. Get Current User's Subscription Plan

**GET** `/api/v1/users/subscription-plan/`

**Response:**
```json
{
    "subscription_plan": "free"
}
```

### 2. Get Available Subscription Plans

**GET** `/api/v1/users/subscription-plan/available/`

**Response:**
```json
{
    "plans": [
        {"value": "free", "label": "Free"},
        {"value": "basic", "label": "Basic"},
        {"value": "premium", "label": "Premium"}
    ]
}
```

### 3. Change Subscription Plan

**POST** `/api/v1/users/subscription-plan/change/`

**Request Body:**
```json
{
    "subscription_plan": "basic"
}
```

**Success Response:**
```json
{
    "message": "Subscription plan successfully changed to basic",
    "subscription_plan": "basic"
}
```

**Error Response (Invalid Plan):**
```json
{
    "error": "Invalid subscription plan. Valid options are: free, basic, premium"
}
```

## Usage Examples

### Using curl

1. **Get current subscription plan:**
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:8000/api/v1/users/subscription-plan/
```

2. **Change to premium plan:**
```bash
curl -X POST \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"subscription_plan": "premium"}' \
     http://localhost:8000/api/v1/users/subscription-plan/change/
```

3. **Get available plans:**
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:8000/api/v1/users/subscription-plan/available/
```

### Using JavaScript/Fetch

```javascript
// Get current subscription plan
const getCurrentPlan = async () => {
    const response = await fetch('/api/v1/users/subscription-plan/', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    return data.subscription_plan;
};

// Change subscription plan
const changePlan = async (newPlan) => {
    const response = await fetch('/api/v1/users/subscription-plan/change/', {
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

- New users are automatically assigned the "free" subscription plan
- The subscription plan is included in the user info endpoint (`/api/v1/users/get-my-info/`)
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
- Adds the `subscription_plan` field to existing users with default value "free"
- Does not require any data migration as the default value is applied automatically

## Future Enhancements

This implementation provides the foundation for subscription plans. Future enhancements could include:
- Payment integration
- Plan-specific feature restrictions
- Subscription history tracking
- Plan expiration dates
- Automatic plan downgrades/upgrades
