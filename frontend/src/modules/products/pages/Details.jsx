import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../api/product";
import { Container, Spinner } from "react-bootstrap";
import { ReactComponent as ProductThumbnailPlaceholder } from "../../common/assets/img/vectors/product-thumbnail-placeholder-lg.svg";
import { apiUrl } from "../../common/api/config";
import {
  Typography,
  Box,
  Button as MUIButton,
  Card,
  CardContent,
} from "@mui/material";
import { ChartColumn, SquarePen } from "lucide-react";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { product } = useProduct(id);

  if (!product) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <div className="mt-3">
      <div className="row">
        <div className="col-md-7">
          <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
            {product.title}
          </Typography>

          <Typography variant="body1" color="textSecondary">
            {product.description || "No description available."}
          </Typography>

          <Box sx={{ display: "flex", gap: 2, my: 3 }}>
            <MUIButton
              variant="contained"
              color="primary"
              onClick={() => navigate(`/products/${id}/analytics`)}
            >
              <ChartColumn style={{ marginRight: 10 }} /> View Analytics
            </MUIButton>
            <MUIButton
              variant="outlined"
              onClick={() => navigate(`/products/${id}/edit`)}
            >
              <SquarePen style={{ marginRight: 10 }} /> Edit Details
            </MUIButton>
          </Box>

          <Card sx={{ mt: 3 }}>
            <CardContent style={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h5" sx={{ mb: 4 }}>
                Product Details
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <span style={{ fontWeight: 500 }}>Platform:</span>{" "}
                {product.platform || "Unknown"}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <span style={{ fontWeight: 500 }}>Category:</span>{" "}
                {product.category || "Uncategorized"}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <span style={{ fontWeight: 500 }}>Price:</span> $
                {product.price || "N/A"}
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div className="col-md-5">
          <div>
            {product.thumbnail ? (
              <div style={{ maxHeight: 650, height: "auto" }}>
                <img
                  className="rounded-lg w-100"
                  src={(() => {
                    const url = product.thumbnail.replace("/media/", "");
                    if (url.startsWith("https")) {
                      return decodeURIComponent(url);
                    } else {
                      return apiUrl + product.thumbnail;
                    }
                  })()}
                  alt={product.title}
                />
              </div>
            ) : (
              <div className="card-img-top text-center">
                <ProductThumbnailPlaceholder />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
