import { apiUrl } from "../../common/api/config";

export const getProductImages = async () => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(apiUrl + "/products/images/", {
    headers: { Authorization: "Bearer " + token },
  });
  return await response.json();
};

export const uploadProductImage = async (file) => {
  const token = localStorage.getItem("accessToken");
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(apiUrl + "/products/images/", {
    method: "POST",
    body: formData,
    headers: { Authorization: "Bearer " + token },
  });
  return await response.json();
};

export const updateProductImage = async (id, data) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(apiUrl + `/products/images/${id}/`, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

