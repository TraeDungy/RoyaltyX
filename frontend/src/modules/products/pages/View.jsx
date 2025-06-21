import { useParams } from "react-router-dom";
import { useProduct } from "../api/product";
import { Container, Spinner } from "react-bootstrap";
import { ReactComponent as ProductThumbnailPlaceholder } from "../../common/assets/img/vectors/product-thumbnail-placeholder-lg.svg";
import { apiUrl } from "../../common/api/config";

const View = () => {
  const { id } = useParams();

 const {product} = useProduct(id);

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
        <div className="col-md-6">
          <h1 className="bold mb-4 mt-4">{product.title}</h1>
          <p className="txt-lighter mb-5">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid
            dolor voluptate blanditiis minima repellendus voluptatem, sapiente
            ex. Quo, id hic! Cumque provident similique quod accusantium
            possimus, accusamus ad exercitationem itaque?
          </p>
        </div>
        <div className="col-md-6">
          <div className="card">
            {product.thumbnail ? (
              <div className="card-img-top" style={{ maxHeight: 650 }}>
                <img
                  className="rounded"
                  src={apiUrl + product.thumbnail}
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

export default View;
