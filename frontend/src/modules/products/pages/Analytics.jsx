import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useProduct } from "../api/product";
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
import { useSettings } from "../../common/contexts/SettingsContext";
import SalesStatsCard from "../../analytics/components/SalesStatsCard";
import GeneralStatsCard from "../../analytics/components/GeneralStatsCard";
import ProductImageCard from "../components/ProductImageCard";
import { Grid } from "@mui/material";

function Analytics() {
  const { id } = useParams();
  const { product } = useProduct(id);
  const {
    showSalesOverTime,
    showRentalsOverTime,
    showImpressionsOverTime,
    showImpressionRevenueOverTime,
    showTotalImpressionsCard,
    showTotalSalesCard,
    showTotalRevenueCard,
    showProductImageCard,
  } = useSettings();

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

  if (!product) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap align-items-center mt-4 mb-3 ps-1">
        <div className="mb-2">
          <h2 className="bold mb-0">{product.title}</h2>
        </div>
        <div className="mb-2">
          <DateRangeSelector />
        </div>
      </div>

      <Grid container spacing={3}>
        {product.thumbnail &&
          showProductImageCard && <ProductImageCard product={product} />}
        {showTotalImpressionsCard && <ImpressionsCard analytics={analytics} />}
        {showTotalSalesCard && <SalesCard analytics={analytics} />}
        {showTotalRevenueCard && <RevenueCard analytics={analytics} />}
      </Grid>

      <Grid container columnSpacing={3}>
        {showSalesOverTime && <SalesOverTime analytics={analytics} />}
        {showRentalsOverTime && <RentalsOverTime analytics={analytics} />}
        {showImpressionsOverTime && (
          <ImpressionsOverTime analytics={analytics} />
        )}
        {showImpressionRevenueOverTime && (
          <ImpressionRevenueOverTime analytics={analytics} />
        )}
      </Grid>
      <Grid container spacing={3}>
        <SalesStatsCard analytics={analytics} />
        <GeneralStatsCard analytics={analytics} showProductCount={false} />
      </Grid>

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
          {product?.sales?.map((sale, index) => (
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
