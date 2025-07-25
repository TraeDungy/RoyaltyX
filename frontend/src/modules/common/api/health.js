import { apiUrl } from "./config";

export const getHealthStatus = async () => {
  const response = await fetch(`${apiUrl}/health/`);
  if (!response.ok) {
    throw new Error("Health check failed");
  }
  return response.json();
};
