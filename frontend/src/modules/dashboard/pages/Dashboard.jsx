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
import QuickButtons from "../components/QuickButtons";
import AdminMessages from "../components/AdminMessages";
import FeatureUpdates from "../components/FeatureUpdates";
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

  return (
    <>
      <QuickButtons />
      <AdminMessages />
      <FeatureUpdates />
      {analytics && (
        <Grid container spacing={3} className="mb-4">
          {showTotalImpressionsCard && <ImpressionsCard analytics={analytics} />}
          {showTotalSalesCard && <SalesCard analytics={analytics} />}
          {showTotalRevenueCard && <RevenueCard analytics={analytics} />}
        </Grid>
      )}
      
      <LinkedAccountsSection sources={sources} loading={loading} />
      <ProductsList products={products} loading={loading} />
    </>
  );
}

export default Dashboard;
