import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiUrl } from "../../common/api/config";

function useFetch(url, options = {}, requiresAuth = true) {
  const fetcher = async () => {
    let headers = options.headers || {};

    if (requiresAuth) {
      const token = localStorage.getItem("accessToken");
      headers = {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      };
    }

    const fullUrl = url.startsWith("http") ? url : `${apiUrl}${url}`;
    const response = await axios(fullUrl, {
      ...options,
      headers,
    });

    return response.data;
  };

  const { data, error, isFetching, refetch } = useQuery([url, options], fetcher, {
    staleTime: 300000,
    cacheTime: 600000,
  });

  return { data: data || [], loading: isFetching, error, refetch };
}

export default useFetch;
