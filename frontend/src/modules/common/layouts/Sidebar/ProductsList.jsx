import { useState } from "react";
import { ChevronDown, ChevronRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useProducts } from "../../contexts/ProductsContext";
import { apiUrl } from "../../api/config";
import { ReactComponent as ProductThumbnailPlaceholder } from '../../assets/img/vectors/product-thumbnail-placeholder.svg'

const ProductsList = () => {

  const { products, loading } = useProducts();

  const [activeMenu, setActiveMenu] = useState(null);


  const toggleSubMenu = (menuId) => {
    setActiveMenu(activeMenu === menuId ? null : menuId);
  };

  return (
    <div className="sidebar-link-group">
      <span className="txt-lighter small ps-2">PRODUCTS</span>
      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <Spinner animation="border" />
        </div>
      ) : (
        products.map((product) => (
          <li
            key={product.id}
            className={`nav-item px-2 rounded my-1 ${activeMenu === product.id ? 'menu-active' : ''}`}
            onClick={() => toggleSubMenu(product.id)}
          >
            <Link className="nav-link d-flex">
              {product.thumbnail ? (
                <img
                  className="img-fluid rounded"
                  width="35"
                  src={apiUrl + product.thumbnail}
                  alt={product.title}
                />
              ) : (
                <ProductThumbnailPlaceholder style={{ width: 35, height: 30 }} />
              )}

              <div className="d-flex justify-content-between align-items-center w-100">
                <span className="ps-3 medium">{product.title}</span>
                {activeMenu === product.id ? (
                  <ChevronDown className="ms-1" />
                ) : (
                  <ChevronRight className="ms-1" />
                )}
              </div>
            </Link>
            {activeMenu === product.id && (
              <ul className="submenu ps-5">
                <li className="nav-item ps-2">
                  <Link to={`/products/${product.id}`} className="nav-link">
                    View
                  </Link>
                </li>
                <li className="nav-item ps-2">
                  <Link to={`/products/${product.id}/reports`} className="nav-link">
                    Reports
                  </Link>
                </li>
                <li className="nav-item ps-2">
                  <Link to={`/products/${product.id}/analytics`} className="nav-link">
                    Analytics
                  </Link>
                </li>
                <li className="nav-item ps-2">
                  <Link to={`/products/${product.id}/producers`} className="nav-link">
                    Producers
                  </Link>
                </li>
              </ul>
            )}
          </li>
        ))
      )}
    </div>
  );
};

export default ProductsList;
