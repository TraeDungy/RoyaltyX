import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const UpgradePlanButton = () => {
  const navigate = useNavigate();
  const { subscriptionPlan } = useAuth();

  const handleUpgradeClick = () => {
    navigate("/account/membership");
  };

  // Don't show upgrade button if user is already on premium
  if (subscriptionPlan === "premium") {
    return null;
  }

  return (
    <Box sx={{ width: "100%", pt: 2.5, pb: 4 }}>
      <Button 
        variant="contained" 
        color="primary" 
        sx={{ width: "100%", py: 1.4 }}
        onClick={handleUpgradeClick}
      >
        {subscriptionPlan === "free" ? "Upgrade Plan" : "Change Plan"}
      </Button>
    </Box>
  );
};
