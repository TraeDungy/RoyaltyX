import { Box, Button } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { Flame } from "lucide-react";

export const UpgradePlanButton = () => {
  const { subscriptionPlan } = useAuth();

  const handleUpgradeClick = () => {
    window.location.href = "/account/membership";
  };

  // Don't show upgrade button if user is already on premium
  if (subscriptionPlan === "premium") {
    return null;
  }

  return (
    <Box sx={{ width: "100%", pt: 2.5, pb: 4 }}>
      <Button
        variant="outlined"
        color="primary"
        sx={{ width: "100%", py: 1.4 }}
        onClick={handleUpgradeClick}
      >
        <Flame size={18} style={{ marginRight: 6 }} />
        {subscriptionPlan === "discovery" ? "Upgrade Plan" : "Change Plan"}
      </Button>
    </Box>
  );
};
