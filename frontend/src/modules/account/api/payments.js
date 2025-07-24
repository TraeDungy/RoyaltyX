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

export const getBillingHistory = async () => {
  try {
    const response = await fetch(apiUrl + "/payments/billing-history/", {
      method: "GET",
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error || "Failed to get billing history");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPaymentMethods = async () => {
  try {
    const response = await fetch(apiUrl + "/payments/payment-methods/", {
      method: "GET",
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error || "Failed to get payment methods");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addPaymentMethod = async (paymentMethodId) => {
  try {
    const response = await fetch(apiUrl + "/payments/payment-methods/add/", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ payment_method_id: paymentMethodId }),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error || "Failed to add payment method");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const removePaymentMethod = async (paymentMethodId) => {
  try {
    const response = await fetch(apiUrl + "/payments/payment-methods/remove/", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ payment_method_id: paymentMethodId }),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error || "Failed to remove payment method");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const setDefaultPaymentMethod = async (paymentMethodId) => {
  try {
    const response = await fetch(apiUrl + "/payments/payment-methods/default/", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ payment_method_id: paymentMethodId }),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error || "Failed to set default payment method");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
