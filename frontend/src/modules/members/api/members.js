import { apiUrl } from "../../common/api/config";

export const addProjectMember = async (data) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(apiUrl + "/projects/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    return error;
  }
};

export const removeProjectMember = async (user_id) => {
  try {
    const token = localStorage.getItem("accessToken");

    const data = {
      user_id: user_id,
    };

    const response = await fetch(apiUrl + "/projects/users/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    return error;
  }
};
