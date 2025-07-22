import { apiUrl } from "./config";

export const getTaskStatus = async (taskId) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${apiUrl}/tasks/${taskId}/`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch task status");
  }

  return data;
};
