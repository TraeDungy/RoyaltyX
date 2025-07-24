import { apiUrl } from "../../common/api/config";

export const getDashboardPreferences = async () => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${apiUrl}/analytics/dashboard-preferences/`, {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to load preferences");
  }
  return response.json();
};

export const saveDashboardPreferences = async (data) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${apiUrl}/analytics/dashboard-preferences/`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to save preferences");
  }
  return response.json();
};
