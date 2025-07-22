import { apiUrl } from "../../common/api/config";

export const getEmailTemplates = async () => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${apiUrl}/emails/templates/`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};

export const createEmailTemplate = async (body) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${apiUrl}/emails/templates/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) throw data;
  return data;
};

export const getEmailTemplateById = async (id) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${apiUrl}/emails/templates/${id}/`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};

export const updateEmailTemplate = async (id, body) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${apiUrl}/emails/templates/${id}/`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) throw data;
  return data;
};

export const deleteEmailTemplate = async (id) => {
  const token = localStorage.getItem("accessToken");
  await fetch(`${apiUrl}/emails/templates/${id}/`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
