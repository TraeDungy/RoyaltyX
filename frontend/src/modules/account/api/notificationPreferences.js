import { apiUrl } from "../../common/api/config";

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
};

export const getNotificationPreferences = async () => {
  const response = await fetch(apiUrl + "/notifications/preferences/", {
    method: "GET",
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new Error(data.errors || "Failed to load preferences");
};

export const updateNotificationPreferences = async (prefs) => {
  const response = await fetch(apiUrl + "/notifications/preferences/", {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(prefs),
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new Error(data.errors || "Failed to update preferences");
};
