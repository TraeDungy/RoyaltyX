import { useState } from "react";
import axios from "axios";
import { apiUrl } from "../../common/api/config";

function useMutation(url, method) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (data = {}, config = {}) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const isFormData =
        typeof FormData !== "undefined" && data instanceof FormData;

      const headers = {
        ...(config?.headers || {}),
        Authorization: token ? `Bearer ${token}` : "",
        ...(isFormData
          ? { "Content-Type": "multipart/form-data" }
          : { "Content-Type": "application/json" }),
      };

      const response = await axios(apiUrl + url, {
        method,
        data: method === "DELETE" ? data || {} : data,
        ...config,
        headers,
      });

      setError(null);

      return response?.data || response || null;
    } catch (err) {
      setError(err);
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
}

export default useMutation;
