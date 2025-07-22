import { apiUrl } from "../../common/api/config";

export const getWhiteLabelConfig = async () => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(apiUrl + "/white-label/config/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return await response.json();
};

export const updateWhiteLabelConfig = async (data) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(apiUrl + "/white-label/config/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};
