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

const SalesOverTime = ({ analytics }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { setShowSalesOverTime } = useSettings();
  const [showGraphColorPalette, setShowGraphColorPalette] = useState(false);
  const { setSalesOverTimeGraphColor, salesOverTimeGraphColor } = useSettings();
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const onSelectColor = (color) => {
    setSalesOverTimeGraphColor(color);
  };

  if (!analytics || !analytics.time_stats) return <p>Loading...</p>;

  const granularity = analytics.granularity || "monthly";
  const salesData = analytics.time_stats;

  const labels = formatChartLabels(salesData, granularity);
  const dataValues = salesData.map((item) => item.sales);
  const chartTitle = getChartTitle("sales", granularity);

  const data = {
    labels,
    datasets: [
      getBaseLineDataset(chartTitle, dataValues, salesOverTimeGraphColor),
    ],
  };

  const options = getBaseLineChartOptions(CHART_CONFIGS.standard);

  return (
    <>
      <div className="col-md-6">
        <div style={{ width: "100%", maxWidth: "1200px", margin: "auto" }}>
          <div className="py-4 d-flex justify-content-between align-items-center">
            <Typography variant="h5">Sales Over Time</Typography>
            <div className="d-flex align-items-center">
              <div className="dropdown">
                <IconButton onClick={toggleDropdown}>
                  <EllipsisVertical size={20} color="var(--color-text)" />
                </IconButton>
                {dropdownVisible && (
                  <div className="dropdown-menu shadow-sm show">
                    <button
                      className="dropdown-item py-2"
                      onClick={() => {
                        setShowSalesOverTime(false);
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

export default SalesOverTime;
