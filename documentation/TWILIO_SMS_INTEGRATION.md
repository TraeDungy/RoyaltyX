# Twilio SMS Integration

Premium users can receive text message updates via Twilio. To enable this feature set the following environment variables:

```
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+15555555555
STRIPE_SMS_PRICE_ID=price_sms
```

The `/notifications/sms/` endpoint queues a message to the user's registered phone number. SMS updates are included at no extra cost in the **premium** plan and can be added to other plans for an additional **$15 per month** via Stripe.
