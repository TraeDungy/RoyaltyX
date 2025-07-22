import { apiUrl } from "../../common/api/config";

export const getMilestones = async () => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(apiUrl + "/milestones/", {
    headers: { Accept: "application/json", Authorization: "Bearer " + token },
  });
  return response.json();
};

export const createMilestone = async (data) => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(apiUrl + "/milestones/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
