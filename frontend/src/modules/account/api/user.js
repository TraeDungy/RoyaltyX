import { apiUrl } from "../../common/api/config";

export const getUserInfo = async () => {
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(apiUrl + "/users/get-my-info/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.errors);
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const changePassword = async (currentPassword, newPassword) => {
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(apiUrl + "/users/change-password/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
      }),
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.error || "Failed to change password");
    }
  } catch (error) {
    throw new Error(error.message || "Network error");
  }
};

export const getPaymentMethod = async () => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(apiUrl + "/users/payment-method/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  return await response.json();
};

export const updatePaymentMethod = async (data) => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(apiUrl + "/users/payment-method/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};
