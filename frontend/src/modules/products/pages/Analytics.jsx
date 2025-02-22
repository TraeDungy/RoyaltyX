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

    const totalRoyaltyRevenue = product?.sales.reduce((sum, sale) => sum + (parseFloat(sale.royalty_amount)), 0);

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
                <h2 className="bold">Analytics</h2>
            </div>


            <div className="row">
                <div className="col-md-4 p-3">
                    <div className="card p-3 d-flex justify-content-center flex-column w-100 h-100">
                        <div className="card-body">
                            <h5 className="mb-3">Total Impressions</h5>
                            <h2 className="bold txt-primary">{product.impressions ?? '0'}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 p-3">
                    <div className="card p-3 d-flex justify-content-center flex-column w-100 h-100">
                        <div className="card-body">
                            <h5 className="mb-3">Total Sales</h5>
                            <h2 className="bold txt-primary">{product.sales.length}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 p-3">
                    <div className="card p-3 d-flex justify-content-center flex-column w-100 h-100">
                        <div className="card-body">
                            <h5 className="mb-3">Total Royalty Revenue</h5>
                            <h2 className="bold txt-primary">{totalRoyaltyRevenue} $</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <h4 className='bold mt-4 mb-4'>General stats</h4>
                    <table className="table table-bordered table-hover">
                        <tbody>
                            <tr>
                                <th>Total Royalty Revenue</th>
                                <th>{totalRoyaltyRevenue} $</th>
                            </tr>
                            <tr>
                                <th>Total Royalty Revenue</th>
                                <th>{totalRoyaltyRevenue} $</th>
                            </tr>                        <tr>
                                <th>Total Royalty Revenue</th>
                                <th>{totalRoyaltyRevenue} $</th>
                            </tr>                        <tr>
                                <th>Total Royalty Revenue</th>
                                <th>{totalRoyaltyRevenue} $</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-md-6">
                    <h4 className='bold mt-4 mb-4'>Sales stats</h4>
                    <table className="table table-bordered table-hover">
                        <tbody>
                            <tr>
                                <th>Total Royalty Revenue</th>
                                <th>{totalRoyaltyRevenue} $</th>
                            </tr>
                            <tr>
                                <th>Total Royalty Revenue</th>
                                <th>{totalRoyaltyRevenue} $</th>
                            </tr>                        <tr>
                                <th>Total Royalty Revenue</th>
                                <th>{totalRoyaltyRevenue} $</th>
                            </tr>                        <tr>
                                <th>Total Royalty Revenue</th>
                                <th>{totalRoyaltyRevenue} $</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <h4 className='bold mt-4 mb-4'>Sales</h4>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Unit price</th>
                        <th>Unit price currency</th>
                        <th>Quantity</th>
                        <th>Is refund</th>
                        <th>Royalty amount</th>
                        <th>Royalty currency</th>
                        <th>Period start</th>
                        <th>Period end</th>
                    </tr>
                </thead>
                <tbody>
                    {product?.sales.map((sale, index) => (
                        <tr key={index}>
                            <th>{sale.type}</th>
                            <th>{sale.unit_price}</th>
                            <th>{sale.unit_price_currency}</th>
                            <th>{sale.quantity}</th>
                            <th>{String(sale.is_refund)}</th>
                            <th>{sale.royalty_amount}</th>
                            <th>{sale.royalty_currency}</th>
                            <td>{new Date(sale.period_start).toLocaleString()}</td>
                            <td>{new Date(sale.period_end).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default Analytics;
