import { useMutation as useReactQueryMutation } from "@tanstack/react-query";
import axios from "axios";
import { apiUrl } from "../../common/api/config";

function useMutation(url, method) {
  const mutationFn = async ({ data = {}, config = {} }) => {
    const token = localStorage.getItem("accessToken");
    const isFormData = typeof FormData !== "undefined" && data instanceof FormData;

    const headers = {
      ...(config.headers || {}),
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

    return response?.data || response || null;
  };

  const { mutateAsync, isLoading, error } = useReactQueryMutation(mutationFn);

  return { mutate: mutateAsync, loading: isLoading, error };
}

export default useMutation;
