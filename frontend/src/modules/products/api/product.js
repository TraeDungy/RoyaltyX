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

export const getProduct = async (id) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(apiUrl + "/products/" + id + "/", {
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

export const updateProduct = async (formData, productId) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(apiUrl + "/products/" + productId + "/", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
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

export const removeProduct = async (id) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${apiUrl}/products/${id}/`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (response.ok && response.status === 204) {
      return { success: true };
    }

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.errors || "Failed to delete product");
    }
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};
