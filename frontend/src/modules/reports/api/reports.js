import { apiUrl } from "../../common/api/config";

export const getReports = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(apiUrl + "/reports/", {
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

export const createReport = async (payload) => {
  try {
    const token = localStorage.getItem("accessToken");
    const params = new URLSearchParams();

    if (payload.period_start) {
      params.append("period_start", payload.period_start);
    }
    if (payload.period_end) {
      params.append("period_end", payload.period_end);
    }
    
    if (payload.template) {
      params.append("template", payload.template);
    }


    const queryString = params.toString();
    const url = `${apiUrl}/reports/${queryString ? "?" + queryString : ""}`;

    const response = await fetch(url, {
      method: "POST",
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
