import { useState, useEffect } from "react";
import { getProducts } from "../../../products/api/product";
import { toast } from "react-toastify";
import { ChevronDown, ChevronRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        toast.error(error.message || "Failed to fetch products");
      }
    };

    fetchProducts();
  }, []);

  const toggleSubMenu = (menuId) => {
    setActiveMenu(activeMenu === menuId ? null : menuId);
  };

  return (
    <div className="sidebar-link-group">
      <span className="txt-lighter small ps-2">PRODUCTS</span>
      {products.map((product) => (
        <li
          key={product.id}
          className={`nav-item px-2 rounded my-1`}
          onClick={() => toggleSubMenu(product.id)}
        >
          <Link className="nav-link d-flex">
            <img
              className="img-fluid rounded"
              width="35"
              src="https://vhx.imgix.net/filmplug/assets/eb2f9876-a8d7-498c-8ea8-79be97d7b423.png?auto=format%2Ccompress&fit=crop&h=720&w=1280"
              alt={product.title}
            />
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
                <Link
                  to={`/products/${product.id}`}
                  className="nav-link"
                >
                  View
                </Link>
              </li>
              <li className="nav-item ps-2">
                <Link
                  to={`/products/${product.id}/reports`}
                  className="nav-link"
                >
                  Reports
                </Link>
              </li>
              <li className="nav-item ps-2">
                <Link
                  to={`/products/${product.id}/analytics`}
                  className="nav-link"
                >
                  Analytics
                </Link>
              </li>
            </ul>
          )}
        </li>
      ))}
    </div>
  );
};

export default ProductsList;
