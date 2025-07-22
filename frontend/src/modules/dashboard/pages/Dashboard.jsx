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
import { useAuth } from "../../common/contexts/AuthContext";

function Dashboard() {
  const { products, loading } = useProducts();
  const { sources } = useSources();
  const [analytics, setAnalytics] = useState(null);
  const { dashboardLayout } = useAuth();
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

  const defaultLayout = [
    "impressions",
    "sales",
    "revenue",
    "linked_accounts",
    "products",
  ];

  const layout = dashboardLayout && dashboardLayout.length ? dashboardLayout : defaultLayout;

  const renderWidget = (widget) => {
    switch (widget) {
      case "impressions":
        return (
          analytics &&
          showTotalImpressionsCard && <ImpressionsCard analytics={analytics} />
        );
      case "sales":
        return analytics && showTotalSalesCard && <SalesCard analytics={analytics} />;
      case "revenue":
        return (
          analytics && showTotalRevenueCard && <RevenueCard analytics={analytics} />
        );
      case "linked_accounts":
        return <LinkedAccountsSection sources={sources} loading={loading} />;
      case "products":
        return <ProductsList products={products} loading={loading} />;
      default:
        return null;
    }
  };

  return <>{layout.map((w) => renderWidget(w))}</>;
}

export default Dashboard;
