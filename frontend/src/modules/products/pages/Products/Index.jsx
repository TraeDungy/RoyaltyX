import { Spinner } from "react-bootstrap";
import ProductCard from "../../../management/components/ProductCard";
import { useProducts } from "../../api/products";
import { Box, Typography } from "@mui/material";
import { Shredder } from "lucide-react";
import PageHeader from "../../../common/components/PageHeader";

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
          <PageHeader title="Products" />
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
            height: "calc(100vh - 66.77px)",
          }}
        >
          <Shredder size={60} color="var(--color-subtle)" />
          <Typography sx={{ mt: 1, color: "text.secondary" }}>
            No products available at the moment.
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Products;
