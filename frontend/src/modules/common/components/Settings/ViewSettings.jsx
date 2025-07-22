import { Button, Typography, Box, IconButton } from "@mui/material";
import { ArrowUp, ArrowDown, RotateCcw } from "lucide-react";
import { useSettings } from "../../contexts/SettingsContext";

const ViewSettings = () => {
  const {
    showSalesOverTime,
    setShowSalesOverTime,
    showRentalsOverTime,
    setShowRentalsOverTime,
    showImpressionsOverTime,
    setShowImpressionsOverTime,
    showImpressionRevenueOverTime,
    setShowImpressionRevenueOverTime,
    showTotalImpressionsCard,
    setShowTotalImpressionsCard,
    showTotalSalesCard,
    setShowTotalSalesCard,
    showTotalRevenueCard,
    setShowTotalRevenueCard,
    dashboardAnalyticsOrder,
    setDashboardAnalyticsOrder,
    resetDashboardAnalyticsOrder,
  } = useSettings();

  const toggleShowSalesOverTime = () => {
    setShowSalesOverTime(!showSalesOverTime);
  };

  const toggleShowRentalsOverTime = () => {
    setShowRentalsOverTime(!showRentalsOverTime);
  };

  const toggleShowImpressionsOverTime = () => {
    setShowImpressionsOverTime(!showImpressionsOverTime);
  };
  const toggleShowImpressionRevenueOverTime = () => {
    setShowImpressionRevenueOverTime(!showImpressionRevenueOverTime);
  };

  const toggleShowTotalImpressionsCard = () => {
    setShowTotalImpressionsCard(!showTotalImpressionsCard);
  };
  const toggleShowTotalSalesCard = () => {
    setShowTotalSalesCard(!showTotalSalesCard);
  };
  const toggleShowTotalRevenueCard = () => {
    setShowTotalRevenueCard(!showTotalRevenueCard);
  };

  const moveCard = (index, direction) => {
    const newOrder = [...dashboardAnalyticsOrder];
    const [removed] = newOrder.splice(index, 1);
    newOrder.splice(index + direction, 0, removed);
    setDashboardAnalyticsOrder(newOrder);
  };

  return (
    <div>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        View Settings
      </Typography>

      <div className="py-4">
        <label className="switch">
          <input
            type="checkbox"
            checked={showSalesOverTime}
            onChange={toggleShowSalesOverTime}
          />
          <span className="slider round"></span>
        </label>
        <span style={{ marginLeft: "10px" }}>Show Sales Over Time</span>
        <p className="txt-lighter small mt-1">
          Hide/show the sales over time chart in the analytics page.
        </p>
      </div>
      <div className="py-4">
        <label className="switch">
          <input
            type="checkbox"
            checked={showRentalsOverTime}
            onChange={toggleShowRentalsOverTime}
          />
          <span className="slider round"></span>
        </label>
        <span style={{ marginLeft: "10px" }}>Show Rentals Over Time</span>
        <p className="txt-lighter small mt-1">
          Hide/show the rentals over time chart in the analytics page.
        </p>
      </div>
      <div className="py-4">
        <label className="switch">
          <input
            type="checkbox"
            checked={showImpressionsOverTime}
            onChange={toggleShowImpressionsOverTime}
          />
          <span className="slider round"></span>
        </label>
        <span style={{ marginLeft: "10px" }}>Show Impressions Over Time</span>
        <p className="txt-lighter small mt-1">
          Hide/show the impressions over time chart in the analytics page.
        </p>
      </div>
      <div className="py-4">
        <label className="switch">
          <input
            type="checkbox"
            checked={showImpressionRevenueOverTime}
            onChange={toggleShowImpressionRevenueOverTime}
          />
          <span className="slider round"></span>
        </label>
        <span style={{ marginLeft: "10px" }}>
          Show Impression Revenue Over Time
        </span>
        <p className="txt-lighter small mt-1">
          Hide/show the impression revenue over time chart in the analytics
          page.
        </p>
      </div>
      <div className="py-4">
        <label className="switch">
          <input
            type="checkbox"
            checked={showTotalImpressionsCard}
            onChange={toggleShowTotalImpressionsCard}
          />
          <span className="slider round"></span>
        </label>
        <span style={{ marginLeft: "10px" }}>Show Total Impressions Card</span>
        <p className="txt-lighter small mt-1">
          Hide/show the total impressions card in the analytics page.
        </p>
      </div>
      <div className="py-4">
        <label className="switch">
          <input
            type="checkbox"
            checked={showTotalSalesCard}
            onChange={toggleShowTotalSalesCard}
          />
          <span className="slider round"></span>
        </label>
        <span style={{ marginLeft: "10px" }}>Show Total Sales Card</span>
        <p className="txt-lighter small mt-1">
          Hide/show the total sales card in the analytics page.
        </p>
      </div>
      <div className="py-4">
        <label className="switch">
          <input
            type="checkbox"
            checked={showTotalRevenueCard}
            onChange={toggleShowTotalRevenueCard}
          />
          <span className="slider round"></span>
        </label>
        <span style={{ marginLeft: "10px" }}>Show Total Revenue Card</span>
        <p className="txt-lighter small mt-1">
          Hide/show the total revenue card in the analytics page.
        </p>
      </div>

      <div className="py-4">
        <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
          Analytics Card Order
        </Typography>
        {dashboardAnalyticsOrder.map((card, index) => (
          <Box
            key={card}
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <Typography sx={{ flex: 1, textTransform: "capitalize" }}>
              {card}
            </Typography>
            <IconButton
              size="small"
              disabled={index === 0}
              onClick={() => moveCard(index, -1)}
            >
              <ArrowUp size={16} />
            </IconButton>
            <IconButton
              size="small"
              disabled={index === dashboardAnalyticsOrder.length - 1}
              onClick={() => moveCard(index, 1)}
            >
              <ArrowDown size={16} />
            </IconButton>
          </Box>
        ))}
        <Button
          variant="text"
          size="small"
          startIcon={<RotateCcw size={16} />}
          onClick={resetDashboardAnalyticsOrder}
        >
          Reset Layout
        </Button>
      </div>
    </div>
  );
};

export default ViewSettings;
