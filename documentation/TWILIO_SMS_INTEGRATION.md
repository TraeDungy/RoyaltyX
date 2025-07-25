# Twilio SMS Integration

Premium users can receive text message updates via Twilio. To enable this feature set the following environment variables:

```
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+15555555555
STRIPE_SMS_PRICE_ID=price_sms
```

The `/notifications/sms/` endpoint queues a message to the user's registered phone number. SMS updates are included at no extra cost in the **premium** plan and can be added to other plans for an additional **$15 per month** via Stripe.

To connect the SMS feature with Stripe:

1. Create a recurring "SMS updates" price in Stripe.
2. Set the resulting Price ID as `STRIPE_SMS_PRICE_ID` in your environment.
3. Run `python manage.py migrate` to apply `0002_sms_addon`, which adds the add-on record automatically.

Once configured, non-premium users can purchase the SMS add-on for $15/month and the app will bill them via Stripe.
