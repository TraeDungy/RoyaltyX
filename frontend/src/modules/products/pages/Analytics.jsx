import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from "../api/product";
import { toast } from 'react-toastify';
import { Container, Spinner } from 'react-bootstrap';

function Analytics() {

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
        <div className="container px-5">
            <div className="mb-3 ps-1">
                <h4 className="bold">Analytics</h4>
            </div>


            <div className="row">
                <div className="col-md-4 p-3">
                    <div className="card bgc-body shadow-sm p-3 rounded d-flex justify-content-center flex-column w-100 h-100 border-0">
                        <div className="card-body">
                            <h5 className="mb-3">Impressions</h5>
                            <h1 className="bold">{product.impressions ?? 'unknown'}</h1>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Analytics;
