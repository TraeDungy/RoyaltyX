import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Container, Spinner } from "react-bootstrap";
import { getProjectAnalytics } from "../api/analytics";
import { useLocation } from "react-router";
import DateRangeSelector from "../../common/components/DateRangeSelector";
import ImpressionsOverTime from "../components/ImpressionsOverTime";
import ImpressionRevenueOverTime from "../components/ImpressionRevenueOverTime";
import SalesOverTime from "../components/SalesOverTime";
import RentalsOverTime from "../components/RentalsOverTime";
import { SalesCard } from "../components/SalesCard";
import { ImpressionsCard } from "../components/ImpressionsCard";
import { RevenueCard } from "../components/RevenueCard";
import { useSettings } from "../../common/contexts/SettingsContext";
import { TopPerfomingContentByImpressions } from "../components/TopPerfomingContentByImpressions";
import { TopPerfomingContentBySales } from "../components/TopPerfomingContentBySales";
import { SourceAnalytics } from "../components/SourceAnalytics";
import SalesStatsCard from "../components/SalesStatsCard";
import GeneralStatsCard from "../components/GeneralStatsCard";
import { Grid, Typography } from "@mui/material";

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const {
    showSalesOverTime,
    showRentalsOverTime,
    showImpressionsOverTime,
    showImpressionRevenueOverTime,
    showTotalImpressionsCard,
    showTotalSalesCard,
    showTotalRevenueCard,
  } = useSettings();
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
        const fetchedAnalytics = await getProjectAnalytics(period_range);
        setAnalytics(fetchedAnalytics);
      } catch (error) {
        toast.error(error.message || "Failed to fetch analytics");
      }
    };

    fetchAnalytics();
  }, [location.search]);

  if (!analytics) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 ps-1">
        <Typography variant="h2" mb={0}>
          Analytics
        </Typography>
        <DateRangeSelector />
      </div>

      <Grid container spacing={3}>
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
        <GeneralStatsCard analytics={analytics} showProductCount={true} />
      </Grid>

      <SourceAnalytics analytics={analytics} />

      <div className="row">
        <Typography variant="h4" fontWeight="bold" sx={{ mt: 4, mb: 2 }}>
          Top Performing Content (by impressions)
        </Typography>
        <TopPerfomingContentByImpressions />
      </div>

      <div className="row">
        <Typography variant="h4" fontWeight="bold" sx={{ mt: 4, mb: 2 }}>
          Top Performing Content (by sales)
        </Typography>
        <TopPerfomingContentBySales />
      </div>
    </>
  );
}

export default Analytics;
