import { apiUrl } from "../../common/api/config";

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
};

export const getSubscriptionPlan = async () => {
  try {
    const response = await fetch(apiUrl + "/users/subscription-plan/", {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.error || "Failed to get subscription plan");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAvailablePlans = async () => {
  try {
    const response = await fetch(apiUrl + "/users/subscription-plan/available/", {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.error || "Failed to get available plans");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const changeSubscriptionPlan = async (planName) => {
  try {
    const response = await fetch(apiUrl + "/users/subscription-plan/change/", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        subscription_plan: planName,
      }),
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.error || "Failed to change subscription plan");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
