import useFetch from "../../global/hooks/useFetch";
import useMutation from "../../global/hooks/useMutation";

export const useSources = () => {
  const { data: sources, loading, refetch } = useFetch("/sources/");
  const {
    mutate: createSourceMutation,
    loading: creating,
    error,
  } = useMutation("/sources/", "POST");

  const createSource = async (source) => {
    const createdSource = await createSourceMutation(source);
    await refetch();
    return createdSource;
  };

  if (error) {
    console.error(error.message);
  }

  return {
    sources,
    loading,
    createSource,
    creating,
    error,
    refetch,
  };
};
