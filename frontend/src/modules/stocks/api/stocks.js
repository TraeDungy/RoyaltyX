import { apiUrl } from "../../common/api/config";

export const getStockPrices = async (symbol) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${apiUrl}/stocks/${symbol}/prices/`, {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const data = await response.json();
  if (response.ok) return data;
  throw new Error(data.errors || "Failed to fetch stock prices");
};
