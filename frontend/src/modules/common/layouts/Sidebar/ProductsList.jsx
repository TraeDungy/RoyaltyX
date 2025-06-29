import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { apiUrl } from "../../api/config";
import { ReactComponent as ProductThumbnailPlaceholder } from "../../assets/img/vectors/product-thumbnail-placeholder.svg";
import { useProducts } from "../../../products/api/products";

const ProductsList = () => {
  const { products, loading } = useProducts();

  return (
    <div className="sidebar-link-group">
      {products?.length > 0 && (
        <span className="txt-lighter small ps-2">PRODUCTS</span>
      )}
      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <Spinner animation="border" />
        </div>
      ) : (
        products?.map((product) => (
          <li
            key={product.id}
            className="nav-item px-2 rounded my-1"
          >
            <Link
              to={`/products/${product.id}`}
              className="nav-link d-flex align-items-center"
            >
              {product.thumbnail ? (
                <img
                  className="img-fluid rounded"
                  style={{ width: 45, height: 35, objectFit: "cover" }}
                  src={(() => {
                    const url = product.thumbnail.replace("/media/", "");
                    if (url.startsWith("https")) {
                      return decodeURIComponent(url).replace("https", "http");
                    } else {
                      return apiUrl + product.thumbnail;
                    }
                  })()}
                  alt={product.title}
                />
              ) : (
                <ProductThumbnailPlaceholder
                  style={{ width: 35, height: 30 }}
                />
              )}

              <span className="ps-3 medium">{product.title}</span>
            </Link>
          </li>
        ))
      )}
    </div>
  );
};

export default ProductsList;
