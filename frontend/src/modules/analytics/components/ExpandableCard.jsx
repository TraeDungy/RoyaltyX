import { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import { EllipsisVertical } from "lucide-react";

const SIZE_MAP = {
  small: 4,
  medium: 8,
  large: 12,
};

export default function ExpandableCard({
  title,
  children,
  initialSize = "small",
}) {
  const [size, setSize] = useState(initialSize);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Grid size={{ md: SIZE_MAP[size], xs: 12 }}>
      <Card
        variant="outlined"
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
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
              <MenuItem
                onClick={() => {
                  setSize("small");
                  handleMenuClose();
                }}
              >
                Single width
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSize("medium");
                  handleMenuClose();
                }}
              >
                Double width
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSize("large");
                  handleMenuClose();
                }}
              >
                Full width
              </MenuItem>
            </Menu>
          </Box>
          {children}
        </CardContent>
      </Card>
    </Grid>
  );
}
