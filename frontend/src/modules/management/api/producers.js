import { apiUrl } from "../../common/api/config";

export const uploadProducers = async (file) => {
  const token = localStorage.getItem("accessToken");
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(apiUrl + "/producers/", {
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
