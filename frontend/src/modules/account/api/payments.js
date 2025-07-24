import { apiUrl } from "../../common/api/config";

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
};

export const createCheckoutSession = async (plan) => {
  try {
    const response = await fetch(apiUrl + "/payments/create-checkout-session/", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        plan: plan,
      }),
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.error || "Failed to create checkout session");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const cancelSubscription = async () => {
  try {
    const response = await fetch(apiUrl + "/payments/cancel-subscription/", {
      method: "POST",
      headers: getAuthHeaders(),
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.error || "Failed to cancel subscription");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSubscriptionStatus = async () => {
  try {
    const response = await fetch(apiUrl + "/payments/subscription-status/", {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.error || "Failed to get subscription status");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const verifySession = async (sessionId) => {
  try {
    const response = await fetch(apiUrl + `/payments/verify-session/?session_id=${sessionId}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.error || "Failed to verify session");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createBillingPortalSession = async () => {
  try {
    const response = await fetch(apiUrl + "/payments/billing-portal-session/", {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.error || "Failed to create billing portal session");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getInvoiceHistory = async () => {
  try {
    const response = await fetch(apiUrl + "/payments/invoices/", {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.error || "Failed to fetch invoices");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
