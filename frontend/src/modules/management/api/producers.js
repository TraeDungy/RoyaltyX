import { apiUrl } from "../../common/api/config";

export const uploadProducers = async (file) => {
  const token = localStorage.getItem("accessToken");
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(apiUrl + "/data_imports/producers/", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    return await response.json();
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};

export const updateProducer = async (data, product_id, user_id) => {
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(apiUrl + `/products/${product_id}/users/${user_id}/`, {
      method: "PUT",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const message =
        typeof responseData === "object"
          ? Object.values(responseData).flat().join(" ")
          : "Something went wrong";

      throw new Error(message);
    }

    return { success: true, message: responseData };
  } catch (error) {
    return { success: false, message: error.message };
  }
};



export const removeProducer = async (product_id, user_id) => {
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(apiUrl + `/products/${product_id}/users/${user_id}`, {
      method: "DELETE",
      headers: {
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
      throw new Error(responseData.errors || 'Failed to delete producer');
    }
  } catch (error) {
    throw new Error(error.message || 'Something went wrong');
  }
};
