import { apiUrl } from "../../common/api/config";

export const getDataset = async (id) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${apiUrl}/data_imports/datasets/${id}/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch dataset");
  }
  return await response.json();
};

export const updateDataset = async (id, data) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${apiUrl}/data_imports/datasets/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update dataset");
  }
  return await response.json();
};
