import { Typography } from "@mui/material";
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
    </div>
  );
};

export default ViewSettings;
