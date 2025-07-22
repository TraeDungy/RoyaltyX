import { apiUrl } from "../../common/api/config";

const authHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
};

export const getFeeTypes = async () => {
  const res = await fetch(apiUrl + "/fees/types/", {
    headers: authHeaders(),
  });
  return res.json();
};

export const createFeeType = async (data) => {
  const res = await fetch(apiUrl + "/fees/types/", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getFeeRules = async () => {
  const res = await fetch(apiUrl + "/fees/rules/", {
    headers: authHeaders(),
  });
  return res.json();
};

export const createFeeRule = async (data) => {
  const res = await fetch(apiUrl + "/fees/rules/", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};
