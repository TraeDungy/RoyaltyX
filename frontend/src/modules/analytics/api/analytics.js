import { apiUrl } from "../../common/api/config";

export const getProjectAnalytics = async (period_range) => {
  try {
    const token = localStorage.getItem("accessToken");
    const params = new URLSearchParams();

    if (period_range.period_start) {
      params.append("period_start", period_range.period_start);
    }
    if (period_range.period_end) {
      params.append("period_end", period_range.period_end);
    }

    const queryString = params.toString();
    const url = `${apiUrl}/projects/analytics${queryString ? "?" + queryString : ""}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.errors);
    }
  } catch (error) {
    throw new Error(error);
  }
};
