import { apiUrl } from "../../common/api/config";

export const requestAccessTokenFromVimeo = async (code) => {
  const url = `${apiUrl}/oauth/vimeo/exchange/`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.errors || "Unable to exchange Vimeo token");
  }
  return data;
};
