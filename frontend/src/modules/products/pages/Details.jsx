import { useParams } from "react-router-dom";
import { useProduct } from "../api/product";
import { Container, Spinner } from "react-bootstrap";
import { ReactComponent as ProductThumbnailPlaceholder } from "../../common/assets/img/vectors/product-thumbnail-placeholder-lg.svg";
import { apiUrl } from "../../common/api/config";
import { Typography } from "@mui/material";

const Details = () => {
  const { id } = useParams();

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

          <p className="txt-lighter mb-5">
            {product.description || "No description available."}
          </p>
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
