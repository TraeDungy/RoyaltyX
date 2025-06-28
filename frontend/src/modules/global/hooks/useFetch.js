import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../common/api/config";

function useFetch(url, options, requiresAuth = true) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      let headers = options?.headers || {};

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

      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
}

export default useFetch;
