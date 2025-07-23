import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Container, Spinner } from "react-bootstrap";
import {
  getProjectAnalytics,
  exportProjectAnalytics,
  getForecasts,
} from "../api/analytics";
import { getYoutubeSourceAnalytics } from "../api/youtube";
import { useSources } from "../../sources/api/sources";
import YoutubeAnalyticsCard from "../components/YoutubeAnalyticsCard";
import { useLocation } from "react-router";
import DateRangeSelector from "../../common/components/DateRangeSelector";
import CustomDateSelector from "../../common/components/CustomDateSelector";
import ImpressionsOverTime from "../components/ImpressionsOverTime";
import ImpressionRevenueOverTime from "../components/ImpressionRevenueOverTime";
import SalesOverTime from "../components/SalesOverTime";
import RentalsOverTime from "../components/RentalsOverTime";
import { useSettings } from "../../common/contexts/SettingsContext";
import { TopPerfomingContentByImpressions } from "../components/TopPerfomingContentByImpressions";
import { TopPerfomingContentBySales } from "../components/TopPerfomingContentBySales";
import { SourceAnalytics } from "../components/SourceAnalytics";
import SalesStatsCard from "../components/SalesStatsCard";
import GeneralStatsCard from "../components/GeneralStatsCard";
import AverageEcpmCard from "../components/AverageEcpmCard";
import RoyaltyPerSaleCard from "../components/RoyaltyPerSaleCard";
import ImpressionsPerProductCard from "../components/ImpressionsPerProductCard";
import { Grid, Typography, Button } from "@mui/material";
import ForecastInsights from "../components/ForecastInsights";
import ExpandableExampleCard from "../components/ExpandableExampleCard";

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [forecasts, setForecasts] = useState([]);
  const [youtubeAnalytics, setYoutubeAnalytics] = useState(null);
  const { sources } = useSources();
  const {
    showSalesOverTime,
    showRentalsOverTime,
    showImpressionsOverTime,
    showImpressionRevenueOverTime,
    showAverageEcpmCard,
    showRoyaltyPerSaleCard,
    showImpressionsPerProductCard,
  } = useSettings();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const handleExport = async () => {
    const periodStart = params.get("period_start");
    const periodEnd = params.get("period_end");

    try {
      const blob = await exportProjectAnalytics({
        period_start: periodStart,
        period_end: periodEnd,
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "analytics.csv");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error(error.message || "Failed to export analytics");
    }
  };

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
        const fetchedForecasts = await getForecasts();
        setForecasts(fetchedForecasts);
      } catch (error) {
        toast.error(error.message || "Failed to fetch analytics");
      }
    };

    fetchAnalytics();
  }, [location.search]);

  useEffect(() => {
    if (!sources) return;
    const youtubeSource = sources.find((s) => s.platform === "youtube");
    if (!youtubeSource) return;

    const periodStart = params.get("period_start");
    const periodEnd = params.get("period_end");
    const period_range = {
      period_start: periodStart,
      period_end: periodEnd,
    };

    const fetchYoutube = async () => {
      try {
        const data = await getYoutubeSourceAnalytics(
          youtubeSource.id,
          period_range,
        );
        setYoutubeAnalytics(data);
      } catch (error) {
        toast.error(error.message || "Failed to fetch YouTube analytics");
      }
    };

    fetchYoutube();
  }, [sources, location.search]);

  if (!analytics) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3 ps-1">
        <Typography variant="h2" mb={0}>
          Analytics
        </Typography>
        <div className="d-flex gap-2">
          <Button variant="outlined" onClick={handleExport}>
            Export CSV
          </Button>
          <DateRangeSelector />
          <CustomDateSelector />
        </div>
      </div>

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
        {showAverageEcpmCard && <AverageEcpmCard analytics={analytics} />}
        {showRoyaltyPerSaleCard && <RoyaltyPerSaleCard analytics={analytics} />}
        {showImpressionsPerProductCard && (
          <ImpressionsPerProductCard analytics={analytics} />
        )}
        {youtubeAnalytics && <YoutubeAnalyticsCard data={youtubeAnalytics} />}
      </Grid>

      <SourceAnalytics analytics={analytics} />

      <ForecastInsights forecasts={forecasts} />

      <ExpandableExampleCard analytics={analytics} />

      <TopPerfomingContentByImpressions />

      <TopPerfomingContentBySales />
    </>
  );
}

export default Analytics;
