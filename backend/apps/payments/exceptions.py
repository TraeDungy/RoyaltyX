class StripeServiceError(Exception):
    """Base class for Stripe service errors."""


class CustomerCreationError(StripeServiceError):
    """Raised when creating a customer fails."""


class CheckoutSessionCreationError(StripeServiceError):
    """Raised when creating a checkout session fails."""


class SubscriptionCancellationError(StripeServiceError):
    """Raised when canceling a subscription fails."""


class SubscriptionUpdateError(StripeServiceError):
    """Raised when updating a subscription fails."""


class PaymentHandlingError(StripeServiceError):
    """Raised when handling a successful payment fails."""


class UserNotFoundError(StripeServiceError):
    """Raised when a user cannot be found."""


class InvoiceRetrievalError(StripeServiceError):
    """Raised when listing invoices fails."""


class PaymentMethodError(StripeServiceError):
    """Raised for errors related to payment methods."""
