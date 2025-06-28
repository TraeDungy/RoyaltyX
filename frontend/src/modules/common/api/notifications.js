import { apiUrl } from "./config";

export const getNotifications = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(apiUrl + "/notifications/", {
      method: "GET",
      headers: {
        Accept: "application/json",
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

export const markNotificationsAsRead = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(apiUrl + "/notifications/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (response.ok) {
      return true;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.errors);
    }
  } catch (error) {
    throw new Error(error);
  }
};

