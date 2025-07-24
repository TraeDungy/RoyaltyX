import { apiUrl } from "../../common/api/config";

export const createBanner = async (data) => {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`${apiUrl}/notifications/banner/admin/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to create banner");
  }
  return res.json();
};

export const fetchActiveBanner = async () => {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`${apiUrl}/notifications/banner/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status === 204) return null;
  if (!res.ok) {
    throw new Error("Failed to load banner");
  }
  return res.json();
};
