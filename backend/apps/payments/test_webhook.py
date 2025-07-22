import json
import logging

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from .stripe_service import StripeService


logger = logging.getLogger(__name__)


@csrf_exempt
@require_POST
def test_webhook(request):
    """Test webhook endpoint that bypasses signature verification"""
    try:
        payload = json.loads(request.body)
        event_type = payload.get("type")

        logger.info("Received webhook event: %s", event_type)

        if event_type == "checkout.session.completed":
            session = payload["data"]["object"]
            logger.info("Processing checkout session: %s", session.get('id'))

            # Handle the successful payment
            try:
                user = StripeService.handle_successful_payment(session)
                logger.info(
                    "Successfully updated user %s to plan %s",
                    user.email,
                    user.subscription_plan,
                )
            except Exception as e:
                logger.error("Error handling successful payment: %s", e)

        elif event_type == "invoice.payment_failed":
            invoice = payload["data"]["object"]
            logger.info("Processing failed payment: %s", invoice.get('id'))

            try:
                user = StripeService.handle_payment_failed(invoice)
                logger.info(
                    "Updated user %s status to %s",
                    user.email,
                    user.subscription_status,
                )
            except Exception as e:
                logger.error("Error handling payment failure: %s", e)

        elif event_type == "customer.subscription.deleted":
            subscription = payload["data"]["object"]
            logger.info(
                "Processing subscription deletion: %s",
                subscription.get('id'),
            )

            try:
                user = StripeService.handle_subscription_deleted(subscription)
                logger.info("Downgraded user %s to free plan", user.email)
            except Exception as e:
                logger.error("Error handling subscription deletion: %s", e)

        return HttpResponse(status=200)

    except Exception as e:
        logger.error("Webhook error: %s", e)
        return HttpResponse(status=500)
