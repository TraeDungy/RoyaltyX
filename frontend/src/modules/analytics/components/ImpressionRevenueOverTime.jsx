import { Line } from "react-chartjs-2";
import { useState } from "react";
import { EyeSlash, Palette } from "react-bootstrap-icons";
import { useSettings } from "../../common/contexts/SettingsContext";
import { GraphColorPalette } from "./GraphColorPalette";
import { Typography, IconButton } from "@mui/material";
import { EllipsisVertical } from "lucide-react";
import {
  getBaseLineChartOptions,
  getBaseLineDataset,
  formatChartLabels,
  getChartTitle,
  CHART_CONFIGS,
} from "../../common/config/chartConfig";

const ImpressionRevenueOverTime = ({ analytics }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { setShowImpressionRevenueOverTime } = useSettings();
  const [showGraphColorPalette, setShowGraphColorPalette] = useState(false);
  const {
    setImpressionRevenueOverTimeGraphColor,
    impressionRevenueOverTimeGraphColor,
  } = useSettings();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const onSelectColor = (color) => {
    setImpressionRevenueOverTimeGraphColor(color);
  };

  if (!analytics || !analytics.time_stats) return <p>Loading...</p>;

  const granularity = analytics.granularity || "monthly";
  const impressionRevenueData = analytics.time_stats;

  const labels = formatChartLabels(impressionRevenueData, granularity);
  const dataValues = impressionRevenueData.map(
    (item) => item.impression_revenue
  );
  const chartTitle = getChartTitle("impression_revenue", granularity);

  const data = {
    labels,
    datasets: [
      getBaseLineDataset(chartTitle, dataValues, impressionRevenueOverTimeGraphColor),
    ],
  };

  const options = getBaseLineChartOptions(CHART_CONFIGS.currency);

  return (
    <>
      <div className="col-md-6">
        <div style={{ width: "100%", maxWidth: "1200px", margin: "auto" }}>
          <div className="py-4 d-flex justify-content-between align-items-center">
            <Typography variant="h5">
              Revenue From Impressions
            </Typography>
            <div className="d-flex align-items-center">
              <div className="dropdown">
                <IconButton onClick={toggleDropdown}>
                  <EllipsisVertical size={20} color="var(--color-text)" />
                </IconButton>
                {dropdownVisible && (
                  <div className="dropdown-menu shadow-sm dropdown-menu-end show">
                    <button
                      className="dropdown-item py-2"
                      onClick={() => {
                        setShowImpressionRevenueOverTime(false);
                        setDropdownVisible(false);
                      }}
                    >
                      Hide <EyeSlash className="ms-1" />
                    </button>
                    <button
                      className="dropdown-item py-2"
                      onClick={() => {
                        setShowGraphColorPalette(true);
                        setDropdownVisible(false);
                      }}
                    >
                      Customize color <Palette className="ms-2" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Line data={data} options={options} />
        </div>
      </div>

      <GraphColorPalette
        showGraphColorPalette={showGraphColorPalette}
        setShowGraphColorPalette={setShowGraphColorPalette}
        onSelectColor={onSelectColor}
      />
    </>
  );
};

export default ImpressionRevenueOverTime;
