import { Line } from "react-chartjs-2";
import { useState } from "react";
import { EyeSlash, Palette } from "react-bootstrap-icons";
import { GraphColorPalette } from "../../analytics/components/GraphColorPalette";
import { Typography, IconButton, Grid, Box } from "@mui/material";
import { EllipsisVertical } from "lucide-react";
import {
  getBaseLineChartOptions,
  getBaseLineDataset,
  formatChartLabels,
  getChartTitle,
} from "../config/chartConfig";

const LineChart = ({
  analytics,
  title,
  metric,
  color,
  onColorChange,
  onHide,
  customOptions = {},
  customDatasetConfig = {},
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showGraphColorPalette, setShowGraphColorPalette] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const onSelectColor = (selectedColor) => {
    onColorChange(selectedColor);
  };

  if (!analytics || !analytics.time_stats) return <p>Loading...</p>;

  const granularity = analytics.granularity || "monthly";
  const timeStats = analytics.time_stats;

  const labels = formatChartLabels(timeStats, granularity);
  const dataValues = timeStats.map((item) => item[metric]);
  const chartTitle = getChartTitle(metric, granularity);

  const data = {
    labels,
    datasets: [
      getBaseLineDataset(chartTitle, dataValues, color, customDatasetConfig),
    ],
  };

  const options = getBaseLineChartOptions(customOptions);

  return (
    <>
      <Grid size={{md: 8, sx: 12}}>
        <Box>
          <div className="py-4 d-flex justify-content-between align-items-center">
            <Typography variant="h5">{title}</Typography>
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
                        onHide();
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
        </Box>
      </Grid>
      <GraphColorPalette
        showGraphColorPalette={showGraphColorPalette}
        setShowGraphColorPalette={setShowGraphColorPalette}
        onSelectColor={onSelectColor}
      />
    </>
  );
};

export default LineChart;
