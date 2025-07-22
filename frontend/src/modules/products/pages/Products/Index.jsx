import { Spinner } from "react-bootstrap";
import ProductCard from "../../../management/components/ProductCard";
import { useProducts } from "../../api/products";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Search, Shredder } from "lucide-react";
import PageHeader from "../../../common/components/PageHeader";
import { useState } from "react";

const Products = () => {
  const { products, loading } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products?.filter((product) =>
    `${product.title} ${product.description}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <Spinner animation="border" />
        </div>
      ) : products?.length > 0 ? (
        <>
          <PageHeader
            title="Products"
            action={
              <TextField
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={20} />
                    </InputAdornment>
                  ),
                }}
                size="small"
              />
            }
          />
          <div className="row">
            {(filteredProducts || []).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {filteredProducts?.length === 0 && (
              <Box sx={{ textAlign: "center", py: 4, width: "100%" }}>
                <Typography variant="h6" color="text.secondary">
                  {searchTerm
                    ? "No products found matching your search"
                    : "No products found"}
                </Typography>
              </Box>
            )}
          </div>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "calc(100vh - 130px)",
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
