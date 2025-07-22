import os

import stripe
from django.contrib.auth import get_user_model
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .stripe_service import StripeService
from .models import AddOn
from .serializers import AddOnSerializer

User = get_user_model()


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_checkout_session(request):
    """Create a Stripe checkout session for subscription upgrade"""
    try:
        plan = request.data.get("plan")
        addon_codes = request.data.get("add_ons", [])
        addons = []
        for code in addon_codes:
            try:
                addons.append(AddOn.objects.get(code=code))
            except AddOn.DoesNotExist:
                return Response({"error": f"Invalid add-on: {code}"}, status=status.HTTP_400_BAD_REQUEST)

        if not plan:
            return Response(
                {"error": "Plan is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        if plan not in ["basic", "premium"]:
            return Response(
                {"error": "Invalid plan. Must be basic or premium"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Check if user is already on this plan
        if request.user.subscription_plan == plan:
            return Response(
                {"error": f"You are already on the {plan} plan"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        session = StripeService.create_checkout_session(request.user, plan, addons)

        return Response({"checkout_url": session.url, "session_id": session.id})

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def cancel_subscription(request):
    """Cancel user's current subscription"""
    try:
        user = request.user

        if not user.stripe_subscription_id:
            return Response(
                {"error": "No active subscription found"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Cancel the subscription in Stripe
        StripeService.cancel_subscription(user.stripe_subscription_id)

        # Update user status
        user.subscription_plan = "free"
        user.subscription_status = "canceled"
        user.stripe_subscription_id = None
        user.subscription_current_period_end = None
        user.save()

        return Response(
            {
                "message": "Subscription cancelled successfully",
                "subscription_plan": "free",
            }
        )

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def update_subscription(request):
    """Update an existing subscription with proration"""
    plan = request.data.get("plan")
    addon_codes = request.data.get("add_ons", [])
    addons = []
    for code in addon_codes:
        try:
            addons.append(AddOn.objects.get(code=code))
        except AddOn.DoesNotExist:
            return Response({"error": f"Invalid add-on: {code}"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        StripeService.update_subscription(request.user, plan, addons)
        return Response({"message": "Subscription updated"})
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def subscription_status(request):
    """Get detailed subscription status for the user"""
    user = request.user

    return Response(
        {
            "subscription_plan": user.subscription_plan,
            "subscription_status": user.subscription_status,
            "stripe_customer_id": user.stripe_customer_id,
            "stripe_subscription_id": user.stripe_subscription_id,
            "subscription_current_period_end": user.subscription_current_period_end,
            "payment_failure_count": user.payment_failure_count,
            "grace_period_end": user.grace_period_end,
        }
    )


@csrf_exempt
@require_POST
def stripe_webhook(request):
    """Handle Stripe webhooks"""
    payload = request.body
    sig_header = request.META.get("HTTP_STRIPE_SIGNATURE")
    endpoint_secret = os.getenv("STRIPE_WEBHOOK_SECRET")

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
    except ValueError:
        # Invalid payload
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError:
        # Invalid signature
        return HttpResponse(status=400)

    # Handle the event
    try:
        if event["type"] == "checkout.session.completed":
            session = event["data"]["object"]
            StripeService.handle_successful_payment(session)

        elif event["type"] == "invoice.payment_failed":
            invoice = event["data"]["object"]
            StripeService.handle_payment_failed(invoice)

        elif event["type"] == "customer.subscription.deleted":
            subscription = event["data"]["object"]
            StripeService.handle_subscription_deleted(subscription)

        elif event["type"] == "customer.subscription.updated":
            subscription = event["data"]["object"]
            # Handle subscription updates (e.g., status changes)
            try:
                user = User.objects.get(stripe_subscription_id=subscription["id"])
                user.subscription_status = subscription["status"]
                user.save()
            except User.DoesNotExist:
                pass

        else:
            print(f'Unhandled event type: {event["type"]}')

    except Exception as e:
        print(f"Error handling webhook: {str(e)}")
        return HttpResponse(status=500)

    return HttpResponse(status=200)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def verify_session(request):
    """Verify a checkout session and return the result"""
    session_id = request.GET.get("session_id")

    if not session_id:
        return Response(
            {"error": "Session ID is required"}, status=status.HTTP_400_BAD_REQUEST
        )

    try:
        session = stripe.checkout.Session.retrieve(session_id)

        if session.payment_status == "paid":
            return Response(
                {
                    "status": "success",
                    "message": (
                        "Payment successful! Your subscription has been "
                        "activated."
                    ),
                    "plan": session.metadata.get("plan"),
                }
            )
        else:
            return Response(
                {"status": "pending", "message": "Payment is still processing."}
            )

    except stripe.error.StripeError as e:
        return Response(
            {"error": f"Failed to verify session: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


class AddOnListView(APIView):
    """Return all active add-ons."""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        addons = AddOn.objects.all()
        serializer = AddOnSerializer(addons, many=True)
        return Response(serializer.data)
