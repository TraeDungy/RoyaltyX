import { useEffect, useState } from "react";
import { apiUrl } from "../../common/api/config";
import { getProductImages, updateProductImage } from "../api/images";
import { useProducts } from "../api/products";
import ProductImageUploadInput from "../components/ProductImageUploadInput";

const ProductImages = () => {
  const [images, setImages] = useState([]);
  const { products, refetch } = useProducts();

  const fetchImages = async () => {
    const data = await getProductImages();
    setImages(data || []);
  };

  useEffect(() => {
    fetchImages();
    refetch();
  }, []);

  const handleChange = async (id, productId) => {
    await updateProductImage(id, { product: productId });
    fetchImages();
  };

  return (
    <div className="py-3">
      <h4>Upload Product Images</h4>
      <ProductImageUploadInput onUploaded={fetchImages} />
      <div className="mt-4">
        {images.map((img) => (
          <div key={img.id} className="mb-3 d-flex align-items-center">
            <img
              src={apiUrl + img.image}
              alt="product"
              style={{ width: 80, height: 80, objectFit: "cover" }}
              className="me-2 border rounded"
            />
            <select
              value={img.product || ""}
              onChange={(e) => handleChange(img.id, e.target.value || null)}
            >
              <option value="">Unassigned</option>
              {products?.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;

