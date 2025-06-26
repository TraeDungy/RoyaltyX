import { apiUrl } from "../../common/api/config";

export const getReportTemplates = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${apiUrl}/reports/templates/`, {
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

export const createReportTemplate = async (body) => {
  try {
    const token = localStorage.getItem("accessToken");
    const formData = new FormData();
    
    for (const key in body) {   
      if (body[key] !== null && body[key] !== undefined) {
        formData.append(key, body[key]);
      }
    }
    
    const response = await fetch(`${apiUrl}/reports/templates/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: formData,
    });

    const responseData = await response.json();
    if (!response.ok) {
      throw responseData;
    }

    return responseData;
  } catch (error) {
    throw error;
  }
};

export const getReportTemplateById = async (id) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${apiUrl}/reports/template/${id}/`, {
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
      throw responseData.errors;
    }
  } catch (error) {
    throw error;
  }
};

export const deleteReportTemplate = async (id) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${apiUrl}/reports/template/${id}/`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateReportTemplate = async (id, body) => {
try {
  const token = localStorage.getItem("accessToken");
  const formData = new FormData();
  
  for (const key in body) {   
    if (body[key] !== null && body[key] !== undefined) {
      formData.append(key, body[key]);
    }
  }
  
  const response = await fetch(`${apiUrl}/reports/template/${id}/`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    body: formData,
  });

  const responseData = await response.json();
  if (!response.ok) {
    throw responseData;
  }

  return responseData;
} catch (error) {
  throw error;
}
};
