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
    const url = `${apiUrl}/analytics/${queryString ? "?" + queryString : ""}`;

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

export const exportProjectAnalytics = async (period_range = {}) => {
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
    const url = `${apiUrl}/analytics/export/${queryString ? "?" + queryString : ""}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (response.ok) {
      return await response.blob();
    }

    const responseData = await response.json();
    throw new Error(responseData.errors);
  } catch (error) {
    throw new Error(error);
  }
};

export const getForecasts = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const url = `${apiUrl}/analytics/forecasts/`;

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

export const compareProductsAnalytics = async (productIds, options = {}) => {
  try {
    const token = localStorage.getItem("accessToken");
    const params = new URLSearchParams();
    if (options.period_start) {
      params.append("period_start", options.period_start);
    }
    if (options.period_end) {
      params.append("period_end", options.period_end);
    }
    if (options.granularity) {
      params.append("granularity", options.granularity);
    }
    params.append("product_ids", productIds.join(","));

    const url = `${apiUrl}/analytics/compare/?${params.toString()}`;
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
    }
    throw new Error(responseData.errors);
  } catch (error) {
    throw new Error(error);
  }
};
