import { Line } from "react-chartjs-2";
import { useState } from "react";
import { EyeSlash, Palette } from "react-bootstrap-icons";
import { useSettings } from "../../common/contexts/SettingsContext";
import { GraphColorPalette } from "./GraphColorPalette";
import {
  Typography,
  IconButton,
  Box,
  Grid,
  Menu,
  MenuItem,
} from "@mui/material";
import { EllipsisVertical } from "lucide-react";
import {
  getBaseLineChartOptions,
  getBaseLineDataset,
  formatChartLabels,
  getChartTitle,
  CHART_CONFIGS,
} from "../../common/config/chartConfig";

const SalesOverTime = ({ analytics }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { setShowSalesOverTime } = useSettings();
  const [showGraphColorPalette, setShowGraphColorPalette] = useState(false);
  const { setSalesOverTimeGraphColor, salesOverTimeGraphColor } = useSettings();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onSelectColor = (color) => {
    setSalesOverTimeGraphColor(color);
  };

  if (!analytics || !analytics.time_stats)
    return <Typography>Loading...</Typography>;

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
      <Grid size={{ xs: 12, md: 6 }}>
        <Box sx={{ width: "100%", maxWidth: "1200px", margin: "auto" }}>
          <Box
            sx={{
              py: 4,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">Sales Over Time</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={handleMenuOpen}>
                <EllipsisVertical size={20} color="var(--color-text)" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem
                  onClick={() => {
                    setShowSalesOverTime(false);
                    handleMenuClose();
                  }}
                  sx={{ py: 1 }}
                >
                  <EyeSlash style={{ marginRight: 8 }} />
                  Hide
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setShowGraphColorPalette(true);
                    handleMenuClose();
                  }}
                  sx={{ py: 1 }}
                >
                  <Palette style={{ marginRight: 8 }} />
                  Customize color
                </MenuItem>
              </Menu>
            </Box>
          </Box>
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

export default SalesOverTime;
