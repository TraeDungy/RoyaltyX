import { useEffect, useState } from "react";
import useMutation from "../../global/hooks/useMutation";
import useFetch from "../../global/hooks/useFetch";
import { apiUrl } from "../../common/api/config";

export const useProduct = (productId) => {
  const [product, setProduct] = useState(null);

  const {
    data,
    loading,
    error: fetchError,
  } = useFetch(`/products/${productId}/`);

  useEffect(() => {
    if (data) {
      setProduct(data);
    }
  }, [data]);
  
  const {
    mutate: updateProductMutation,
    loading: updating,
    error: updateError,
  } = useMutation(`/products/${productId}/`, "PUT");

  const {
    mutate: deleteProductMutation,
    loading: deleting,
    error: deleteError,
  } = useMutation(`/products/${productId}/`, "DELETE");

  const updateProduct = async (productData) => {
    try {
      const updated = await updateProductMutation(productData);
      return updated;
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async () => {
    deleteProductMutation();
  };

  const error = updateError || deleteError;

  useEffect(() => {
    if (error) {
      console.error(error.message);
    }
  }, [error]);

  return {
    product,
    loading,
    fetchError,
    updateProduct,
    updating,
    deleteProduct,
    deleting,
    error,
  };
};


export const getTopPerformingProductsByImpressions = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(
      apiUrl + "/products/top-performing-by-impressions/",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      },
    );

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.errors);
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const getTopPerformingProductsBySales = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(
      apiUrl + "/products/top-performing-by-sales/",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      },
    );

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.errors);
    }
  } catch (error) {
    throw new Error(error);
  }
};
