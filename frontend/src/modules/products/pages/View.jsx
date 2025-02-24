import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../api/product';
import { toast } from 'react-toastify';
import { Container, ListGroup, Spinner } from 'react-bootstrap';

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
          <h1 className="bold mb-4">{product.title}</h1>
          <p className='txt-lighter mb-5'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid dolor voluptate blanditiis minima repellendus voluptatem, sapiente ex. Quo, id hic! Cumque provident similique quod accusantium possimus, accusamus ad exercitationem itaque?
          </p>
          <ListGroup variant="flush">
            <ListGroup.Item><strong>Statement Frequency:</strong> {product.statement_frequency}</ListGroup.Item>
            <ListGroup.Item><strong>First Statement End Date:</strong> {product.first_statement_end_date}</ListGroup.Item>
            <ListGroup.Item><strong>Payment Threshold:</strong> {product.payment_threshold}</ListGroup.Item>
            <ListGroup.Item><strong>Payment Window:</strong> {product.payment_window}</ListGroup.Item>
            <ListGroup.Item><strong>Active:</strong> {product.is_active ? "Yes" : "No"}</ListGroup.Item>
            <ListGroup.Item><strong>Notes:</strong> {product.notes || ""}</ListGroup.Item>
          </ListGroup>
    </div>
  );
};

export default View;
