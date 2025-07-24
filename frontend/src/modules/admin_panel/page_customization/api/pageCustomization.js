import useFetch from "../../../global/hooks/useFetch";
import useMutation from "../../../global/hooks/useMutation";

export const usePageCustomization = (page) => {
  return useFetch(`/branding/page-customizations/${page}/`, null, false);
};

export const useUpdatePageCustomization = (page) => {
  return useMutation(`/branding/page-customizations/${page}/`, "PUT");
};
