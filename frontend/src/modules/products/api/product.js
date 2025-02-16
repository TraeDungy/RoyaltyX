import { apiUrl } from "../../common/api/config";

export const getProducts = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(apiUrl + "/products/", {
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

export const updateProduct = async (product, productId) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(apiUrl + "/products/" + productId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(product),
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    return error;
  }
};

export const createProduct = async (product) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(apiUrl + "/products/", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Failed to save product");
    }

    return responseData;
  } catch (error) {
    throw error;
  }
};
