import { Card, CardContent, Grid, Typography, Box, IconButton, Menu, MenuItem } from "@mui/material";
import { EyeSlash } from "react-bootstrap-icons";
import { InfoPopover } from "../../common/components/InfoPopover";
import { useState } from "react";
import { useSettings } from "../../common/contexts/SettingsContext";

const AverageEcpmCard = ({ analytics }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { setShowAverageEcpmCard } = useSettings();

  if (!analytics || !analytics.total_impressions || !analytics.total_impression_revenue) {
    return null;
  }

  const averageEcpm =
    analytics.total_impressions > 0
      ? (analytics.total_impression_revenue / analytics.total_impressions) * 1000
      : 0;

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid item md={4} xs={12}>
      <Card variant="outlined" sx={{ mb: 3, mt: 4 }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ textTransform: "uppercase", fontWeight: 500, fontSize: "0.875rem", color: "text.secondary" }}>
              AVERAGE ECPM
              <InfoPopover title="Average eCPM" text="Total impression revenue divided by total impressions, multiplied by 1000." />
            </Typography>
            <IconButton onClick={handleMenuOpen} size="sm">
              <EyeSlash size={16} color="var(--color-text)" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem
                onClick={() => {
                  setShowAverageEcpmCard(false);
                  handleMenuClose();
                }}
                sx={{ py: 1 }}
              >
                <EyeSlash style={{ marginRight: 8 }} />
                Hide
              </MenuItem>
            </Menu>
          </Box>
          <Typography variant="h3" fontWeight="bold" color="primary.main">
            ${averageEcpm.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default AverageEcpmCard;
