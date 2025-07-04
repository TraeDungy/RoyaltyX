import { Spinner } from "react-bootstrap";
import ProductCard from "../../../management/components/ProductCard";
import { useProducts } from "../../api/products";
import { Box, Typography } from "@mui/material";
import { Shredder } from "lucide-react";

const Products = () => {
  const { products, loading } = useProducts();

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <Spinner animation="border" />
        </div>
      ) : products?.length > 0 ? (
        <>
          <Box sx={{ my: 3 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
              Products
            </Typography>
          </Box>
          <div className="row">
            {products?.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "calc(100vh - 64px)",
          }}
        >
          <Shredder size={60} className="txt-lighter" />
          <Typography sx={{ mt: 2 }}>
            No products available at the moment.
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Products;
