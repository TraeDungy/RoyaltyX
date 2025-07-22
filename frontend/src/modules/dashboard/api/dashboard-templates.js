import { apiUrl } from "../../common/api/config";

export const getDashboardTemplates = async () => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${apiUrl}/admin/dashboard/templates/`, {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return await response.json();
};

export const createDashboardTemplate = async (body) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${apiUrl}/admin/dashboard/templates/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};

export const updateDashboardTemplate = async (id, body) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${apiUrl}/admin/dashboard/templates/${id}/`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};

export const deleteDashboardTemplate = async (id) => {
  const token = localStorage.getItem("accessToken");
  return await fetch(`${apiUrl}/admin/dashboard/templates/${id}/`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
};
