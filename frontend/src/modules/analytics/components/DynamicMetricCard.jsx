import { Card, CardContent, Grid, Typography, Box, IconButton, Menu, MenuItem } from "@mui/material";
import { EyeSlash } from "react-bootstrap-icons";
import { useState } from "react";
import { useSettings } from "../../common/contexts/SettingsContext";

const DynamicMetricCard = ({ name, value }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { toggleMetricVisibility } = useSettings();

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
              {name.replace(/_/g, " ")}
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
                  toggleMetricVisibility(name);
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
            {Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default DynamicMetricCard;

