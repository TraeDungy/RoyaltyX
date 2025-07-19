import { Spinner } from "react-bootstrap";
import { ReactComponent as ProductThumbnailPlaceholder } from "../../common/assets/img/vectors/product-thumbnail-placeholder-lg.svg";
import { useNavigate } from "react-router";
import { apiUrl } from "../../common/api/config";
import { Box, Button, Grid, Typography } from "@mui/material";
import { ArrowRight, Shredder } from "lucide-react";

export const ProductsList = ({ products, loading }) => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          mt: 6,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Products
        </Typography>
        <Button variant="outlined" onClick={() => navigate("/products")}>
          View All <ArrowRight className="ms-2" />
        </Button>
      </Box>

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <Spinner animation="border" />
        </div>
      ) : products?.length > 0 ? (
        <div className="row">
          {products?.map((product) => (
            <div className="col-md-4 pb-4" key={product.id}>
              <div
                className="card pointer bg-transparent border-0"
                onClick={() => {
                  navigate("/products/" + product.id);
                }}
              >
                {product.thumbnail ? (
                  <div className="card-img-top">
                    <img
                      alt={product.title}
                      className="rounded"
                      src={(() => {
                        const url = product.thumbnail.replace("/media/", "");
                        if (url.startsWith("https")) {
                          return decodeURIComponent(url).replace(
                            "https",
                            "http"
                          );
                        } else {
                          return apiUrl + product.thumbnail;
                        }
                      })()}
                    />
                  </div>
                ) : (
                  <div className="card-img-top text-center">
                    <ProductThumbnailPlaceholder />
                  </div>
                )}
                <div className="py-3">
                  <h5>{product.title}</h5>
                  <p className="txt-lighter medium">{product.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "center",
            mt: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 10,
            }}
          >
            <Shredder size={60} color="var(--color-subtle)" />
            <Typography sx={{ mt: 1, color: "text.secondary" }}>
              No products available at the moment.
            </Typography>
          </Box>
        </Grid>
      )}
    </>
  );
};
