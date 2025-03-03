import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../api/product';
import { toast } from 'react-toastify';
import { Container, Spinner } from 'react-bootstrap';
import { ReactComponent as ProductThumbnailPlaceholder } from '../../common/assets/img/vectors/product-thumbnail-placeholder-lg.svg'
import { apiUrl } from '../../common/api/config';

const View = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProduct(id);
        setProduct(fetchedProduct);
      } catch (error) {
        toast.error(error.message || "Failed to fetch product");
      }
    };

    fetchProduct();
  }, [id]);

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
          <p className='txt-lighter mb-5'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid dolor voluptate blanditiis minima repellendus voluptatem, sapiente ex. Quo, id hic! Cumque provident similique quod accusantium possimus, accusamus ad exercitationem itaque?
          </p>
        </div>
        <div className="col-md-6">
          <div className='card'>
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
