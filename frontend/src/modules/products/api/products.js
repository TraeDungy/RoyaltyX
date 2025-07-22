import useFetch from "../../global/hooks/useFetch";
import useMutation from "../../global/hooks/useMutation";

export const useProducts = () => {
  const { data: products, loading, refetch } = useFetch("/products/");
  const {
    mutate: createProductMutation,
    loading: creating,
    error,
  } = useMutation("/products/", "POST");

  const createProduct = async (product) => {
    const createdProduct = await createProductMutation(product);
    await refetch();
    return createdProduct;
  };

  if (error) {
    console.error(error.message);
  }

  return {
    products,
    loading,
    createProduct,
    creating,
    error,
    refetch,
  };
};
