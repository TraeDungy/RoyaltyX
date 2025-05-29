import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getProduct } from "../api/product";
import { toast } from "react-toastify";
import { Container, Spinner } from "react-bootstrap";
import DateRangeSelector from "../../common/components/DateRangeSelector";
import { getProductAnalytics } from "../api/analytics";
import { ImpressionsCard } from "../../analytics/components/ImpressionsCard";
import { SalesCard } from "../../analytics/components/SalesCard";
import { RevenueCard } from "../../analytics/components/RevenueCard";
import SalesOverTime from "../../analytics/components/SalesOverTime";
import RentalsOverTime from "../../analytics/components/RentalsOverTime";
import ImpressionsOverTime from "../../analytics/components/ImpressionsOverTime";
import ImpressionRevenueOverTime from "../../analytics/components/ImpressionRevenueOverTime";

function Analytics() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  const [analytics, setAnalytics] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  useEffect(() => {
    const periodStart = params.get("period_start");
    const periodEnd = params.get("period_end");

    const period_range = {
      period_start: periodStart,
      period_end: periodEnd,
    };

    const fetchAnalytics = async () => {
      try {
        const fetchedAnalytics = await getProductAnalytics(id, period_range);
        setAnalytics(fetchedAnalytics);
      } catch (error) {
        toast.error(error.message || "Failed to fetch analytics");
      }
    };

    fetchAnalytics();
  }, [location]);

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
    <>
      <div className="d-flex justify-content-between align-items-center mt-4 mb-3 ps-1">
        <h2 className="bold">{product.title}</h2>
        <DateRangeSelector />
      </div>

      <div className="row">
        <ImpressionsCard analytics={analytics} />
        <SalesCard analytics={analytics} />
        <RevenueCard analytics={analytics} />
      </div>

      <div className="row">
        <div className="col-md-6">
          <SalesOverTime analytics={analytics} />
        </div>
        <div className="col-md-6">
          <RentalsOverTime analytics={analytics} />
        </div>
        <div className="col-md-6">
          <ImpressionsOverTime analytics={analytics} />
        </div>
        <div className="col-md-6">
          <ImpressionRevenueOverTime analytics={analytics} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h4 className="bold mt-4 mb-4">Sales stats</h4>
          <table className="table table-bordered table-hover">
            <tbody>
              <tr>
                <th>Number of rentals</th>
                <td className="text-end">
                  {analytics?.rentals_count?.toLocaleString()}
                </td>
              </tr>
              <tr>
                <th>Number of purchases</th>
                <td className="text-end">
                  {analytics?.purchases_count?.toLocaleString()}
                </td>
              </tr>
              <tr>
                <th>Earnings from rentals</th>
                <td className="text-end">
                  {analytics?.rentals_revenue?.toLocaleString()} $
                </td>
              </tr>
              <tr>
                <th>Earnings from purchases</th>
                <td className="text-end">
                  {analytics?.purchases_revenue?.toLocaleString()} $
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <h4 className="bold mt-4 mb-4">General stats</h4>
          <table className="table table-bordered table-hover">
            <tbody>
              <tr>
                <th>Impressions</th>
                <td className="text-end">
                  {analytics?.total_impressions?.toLocaleString()}
                </td>
              </tr>
              <tr>
                <th>Revenue From Impressions</th>
                <td className="text-end">
                  ${analytics?.impression_revenue?.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <h4 className="bold mt-4 mb-4">Sales</h4>
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
              <td>{sale.type}</td>
              <td>{sale.unit_price}</td>
              <td>{sale.unit_price_currency}</td>
              <td>{sale.quantity}</td>
              <td>{String(sale.is_refund)}</td>
              <td>{sale.royalty_amount}</td>
              <td>{sale.royalty_currency}</td>
              <td>{new Date(sale.period_start)?.toLocaleString()}</td>
              <td>{new Date(sale.period_end)?.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Analytics;
