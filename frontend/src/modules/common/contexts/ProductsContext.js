import { createContext, useState, useContext, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { getProducts } from "../../products/api/product";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            toast.error(error.message || "Failed to fetch products");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <ProductsContext.Provider value={{ products, setProducts, loading, refetchProducts: fetchProducts }}>
            {children}
        </ProductsContext.Provider>
    );
};

export const useProducts = () => useContext(ProductsContext);
