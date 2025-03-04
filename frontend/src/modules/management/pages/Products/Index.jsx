import { useProducts } from "../../../common/contexts/ProductsContext";
import { Spinner } from "react-bootstrap";
import ProductCard from "../../components/ProductCard";

const Products = () => {

    const { products, loading } = useProducts();


    return (
        <div>
            <div className="my-3 ps-1">
                <h4 className="bold mb-4">Products</h4>
            </div>

            {loading ? (
                <div className="d-flex justify-content-center py-5">
                    <Spinner animation="border" />
                </div>
            ) : products?.length > 0 ? (
                <div className="row">
                    {products?.map((product) => (
                        <ProductCard product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-5">
                    <p className="txt-lighter medium">
                        No products available at the moment.
                    </p>
                </div>
            )}
        </div>
    );
}

export default Products;
