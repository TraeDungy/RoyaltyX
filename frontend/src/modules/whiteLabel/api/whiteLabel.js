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

export const saveWhiteLabelConfig = async (data) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(apiUrl + "/white-label/config/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const estimateWhiteLabelCost = async (seats, resellPrice) => {
  const token = localStorage.getItem("accessToken");
  const params = new URLSearchParams({ seats, resell_price: resellPrice });
  const response = await fetch(
    apiUrl + "/white-label/cost-estimate/?" + params.toString(),
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return await response.json();
};
