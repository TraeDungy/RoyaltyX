import useFetch from "../../global/hooks/useFetch";
import useMutation from "../../global/hooks/useMutation";

export const useInvoices = () => {
  const { data: invoices, loading, refetch } = useFetch("/invoices/");

  const { mutate: createInvoice } = useMutation("/invoices/", "POST");

  return { invoices, loading, createInvoice, refetch };
};
