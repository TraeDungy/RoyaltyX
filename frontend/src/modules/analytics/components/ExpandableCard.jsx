import { useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import { EllipsisVertical } from "lucide-react";

const SIZE_OPTIONS = [
  { id: "single", label: "Single width", md: 4 },
  { id: "double", label: "Double width", md: 8 },
  { id: "full", label: "Full width", md: 12 },
];

const ExpandableCard = ({ title, children, defaultSize = "single" }) => {
  const [size, setSize] = useState(defaultSize);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSelectSize = (optionId) => {
    setSize(optionId);
    handleMenuClose();
  };

  const option = SIZE_OPTIONS.find((o) => o.id === size) || SIZE_OPTIONS[0];

  return (
    <Grid
      item
      xs={12}
      md={option.md}
      data-testid="expandable-card"
      data-size={size}
      sx={{ mt: 3 }}
    >
      <Card
        variant="outlined"
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            {title && (
              <Typography
                variant="h6"
                sx={{
                  textTransform: "uppercase",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  color: "text.secondary",
                }}
              >
                {title}
              </Typography>
            )}
            <IconButton onClick={handleMenuOpen} size="small">
              <EllipsisVertical size={16} color="var(--color-text)" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {SIZE_OPTIONS.map((o) => (
                <MenuItem
                  key={o.id}
                  onClick={() => handleSelectSize(o.id)}
                  sx={{ py: 1 }}
                >
                  {o.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {children}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ExpandableCard;
