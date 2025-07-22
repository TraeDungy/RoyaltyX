import { apiUrl } from "../../common/api/config";

export const getEmailTemplates = async () => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${apiUrl}/emails/templates/`, {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return await response.json();
};

export const createEmailTemplate = async (data) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${apiUrl}/emails/templates/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const updateEmailTemplate = async (id, data) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${apiUrl}/emails/templates/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const getEmailTemplate = async (id) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${apiUrl}/emails/templates/${id}/`, {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return await response.json();
};

export const deleteEmailTemplate = async (id) => {
  const token = localStorage.getItem("accessToken");
  return await fetch(`${apiUrl}/emails/templates/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
