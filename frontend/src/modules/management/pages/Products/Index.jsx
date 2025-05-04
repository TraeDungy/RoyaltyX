import { useProducts } from "../../../common/contexts/ProductsContext";
import { Spinner } from "react-bootstrap";
import ProductCard from "../../components/ProductCard";
import { removeProduct } from "../../../products/api/product";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Products = () => {
  const { products, setProducts, loading } = useProducts();
  const navigate = useNavigate();

  const handleEdit = (product_id) => {
    navigate(`/management/products/${product_id}/edit`);
  };

  const handleDelete = async (product_id) => {
    const updatedProducts = products.filter(
      (product) => product.id !== product_id,
    );
    setProducts(updatedProducts);

    try {
      const response = await removeProduct(product_id);

      if (response.success) {
        toast.success("Product successfully deleted");
      } else {
        throw new Error("Failed to delete the product");
      }
    } catch (error) {
      setProducts(products);
      toast.error(error.message || "Failed to delete the product");
    }
  };

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
            <ProductCard
              product={product}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
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
};

export default Products;
