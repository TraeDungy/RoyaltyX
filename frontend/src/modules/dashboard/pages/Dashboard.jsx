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
import {
  Grid,
  Box,
  TextField,
  Button as MuiButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { ReactSortable } from "react-sortablejs";

function Dashboard() {
  const { products, loading } = useProducts();
  const { sources } = useSources();
  const [analytics, setAnalytics] = useState(null);
  const [newLayoutName, setNewLayoutName] = useState("");
  const {
    showTotalImpressionsCard,
    showTotalSalesCard,
    showTotalRevenueCard,
    dashboardAnalyticsOrder,
    setDashboardAnalyticsOrder,
    dashboardLayouts,
    currentDashboardLayout,
    saveDashboardLayout,
    applyDashboardLayout,
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
    revenue: showTotalRevenueCard ? (
      <RevenueCard analytics={analytics} />
    ) : null,
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 2 }}>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel id="layout-select-label">Load Layout</InputLabel>
          <Select
            labelId="layout-select-label"
            value={currentDashboardLayout}
            label="Load Layout"
            onChange={(e) => applyDashboardLayout(e.target.value)}
          >
            <MenuItem value="">
              <em>Default</em>
            </MenuItem>
            {Object.keys(dashboardLayouts).map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          size="small"
          label="Save layout as"
          value={newLayoutName}
          onChange={(e) => setNewLayoutName(e.target.value)}
        />
        <MuiButton
          variant="outlined"
          size="small"
          onClick={() => {
            saveDashboardLayout(newLayoutName);
            setNewLayoutName("");
          }}
        >
          Save
        </MuiButton>
      </Box>

      {analytics && (
        <ReactSortable
          tag={Grid}
          list={dashboardAnalyticsOrder.map((id) => ({ id }))}
          setList={(list) =>
            setDashboardAnalyticsOrder(list.map((item) => item.id))
          }
          className="mb-4"
          animation={200}
          container
          spacing={3}
        >
          {dashboardAnalyticsOrder
            .map((key) => cardComponents[key])
            .filter(Boolean)}
        </ReactSortable>
      )}

      <LinkedAccountsSection sources={sources} loading={loading} />
      <ProductsList products={products} loading={loading} />
    </>
  );
}

export default Dashboard;
