import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LinkedAccountsSection } from "../components/LinkedAccountsSection";
import { useProducts } from "../../products/api/products";
import { ProductsList } from "../components/ProductsList";
import { useSources } from "../../sources/api/sources";
import { getProjectAnalytics } from "../../analytics/api/analytics";
import { SalesCard } from "../../analytics/components/SalesCard";
import { ImpressionsCard } from "../../analytics/components/ImpressionsCard";
import { RevenueCard } from "../../analytics/components/RevenueCard";
import { useSettings } from "../../common/contexts/SettingsContext";
import { useLocation } from "react-router";
import { Grid } from "@mui/material";

function Dashboard() {
  const { products, loading } = useProducts();
  const { sources } = useSources();
  const [analytics, setAnalytics] = useState(null);
  const {
    showTotalImpressionsCard,
    showTotalSalesCard,
    showTotalRevenueCard,
    dashboardAnalyticsOrder,
  } = useSettings();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const periodStart = params.get("period_start");
    const periodEnd = params.get("period_end");

    const period_range = {
      period_start: periodStart,
      period_end: periodEnd,
    };

    const fetchAnalytics = async () => {
      try {
        const fetchedAnalytics = await getProjectAnalytics(period_range);
        setAnalytics(fetchedAnalytics);
      } catch (error) {
        toast.error(error.message || "Failed to fetch analytics");
      }
    };

    fetchAnalytics();
  }, [location.search]);

  const cardComponents = {
    impressions: showTotalImpressionsCard ? (
      <ImpressionsCard analytics={analytics} />
    ) : null,
    sales: showTotalSalesCard ? <SalesCard analytics={analytics} /> : null,
    revenue: showTotalRevenueCard ? <RevenueCard analytics={analytics} /> : null,
  };

  return (
    <>
      {analytics && (
        <Grid container spacing={3} className="mb-4">
          {dashboardAnalyticsOrder
            .map((key) => cardComponents[key])
            .filter(Boolean)}
        </Grid>
      )}
      
      <LinkedAccountsSection sources={sources} loading={loading} />
      <ProductsList products={products} loading={loading} />
    </>
  );
}

export default Dashboard;
