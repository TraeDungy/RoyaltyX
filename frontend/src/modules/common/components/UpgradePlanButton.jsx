import { Box, Button } from "@mui/material";

export const UpgradePlanButton = () => {
  return (
    <Box sx={{ width: "100%", pt: 3, pb: 5 }}>
      <Button variant="contained" color="primary" sx={{ width: "100%", py: 1.4 }}>
        Upgrade Plan
      </Button>
    </Box>
  );
};
