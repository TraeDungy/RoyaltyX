import { RevenueChart } from "./RevenueChart";
import { InfoPopover } from "../../common/components/InfoPopover";
import { useState } from "react";
import { EyeSlash, Palette } from "react-bootstrap-icons";
import { useSettings } from "../../common/contexts/SettingsContext";
import { GraphColorPalette } from "./GraphColorPalette";
import GraphTypeSelector from "./GraphTypeSelector";
import {
  IconButton,
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { EllipsisVertical, ArrowRight, BarChart2, Type } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const RevenueCard = ({ analytics }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { setShowTotalRevenueCard } = useSettings();
  const [showGraphColorPalette, setShowGraphColorPalette] = useState(false);
  const [showGraphTypeSelector, setShowGraphTypeSelector] = useState(false);
  const {
    setrevenueGraphColor,
    setRevenueGraphType,
    revenueValueFormat,
    setRevenueValueFormat,
  } = useSettings();
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onSelectColor = (color) => {
    setrevenueGraphColor(color);
  };

  return (
    <>
      <Grid size={{ md: 4, xs: 12 }}>
        <Card
          variant="outlined"
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent sx={{ flexGrow: 1, pb: '12px !important' }}>
          <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  textTransform: "uppercase",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  color: "text.secondary",
                }}
              >
                Revenue in last 4 months
                <InfoPopover
                  title="Monthly revenue"
                  text="This stat represents the total royalty revenue generated over the last month."
                />
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton onClick={handleMenuOpen} size="sm">
                  <EllipsisVertical size={16} color="var(--color-text)" />
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
                      setShowTotalRevenueCard(false);
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
                  <MenuItem
                    onClick={() => {
                      setShowGraphTypeSelector(true);
                      handleMenuClose();
                    }}
                    sx={{ py: 1 }}
                  >
                    <BarChart2 style={{ marginRight: 8 }} />
                    Graph type
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setRevenueValueFormat(
                        revenueValueFormat === "currency" ? "number" : "currency"
                      );
                      handleMenuClose();
                    }}
                    sx={{ py: 1 }}
                  >
                    <Type style={{ marginRight: 8 }} />
                    Toggle format
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
            <Box sx={{ mb: 3, pl: 1 }}>
              <Typography variant="h1" sx={{ fontWeight: "bold" }}>
                {revenueValueFormat === "currency"
                  ? `$${analytics?.total_royalty_revenue?.toLocaleString()}`
                  : analytics?.total_royalty_revenue?.toLocaleString()}
              </Typography>
            </Box>

            <RevenueChart analytics={analytics} />

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="text"
                size="small"
                onClick={() => navigate("/analytics")}
                sx={{
                  textTransform: "none",
                  color: "primary.main",
                  py: .3,
                  fontSize: "1rem"
                  
                }}
                endIcon={<ArrowRight size={18} />}
              >
                View details
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <GraphColorPalette
        showGraphColorPalette={showGraphColorPalette}
        setShowGraphColorPalette={setShowGraphColorPalette}
        onSelectColor={onSelectColor}
      />
      <GraphTypeSelector
        open={showGraphTypeSelector}
        onClose={() => setShowGraphTypeSelector(false)}
        onSelectType={(type) => {
          setRevenueGraphType(type);
          setShowGraphTypeSelector(false);
        }}
      />
    </>
  );
};
