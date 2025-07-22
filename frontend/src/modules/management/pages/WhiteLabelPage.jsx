import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { toast } from "react-toastify";
import { getWhiteLabelConfig, updateWhiteLabelConfig } from "../api/whiteLabel";

const CostEstimator = () => {
  const [seats, setSeats] = useState(1);
  const [wholesalePrice, setWholesalePrice] = useState(35);
  const [resellPrice, setResellPrice] = useState(70);

  const monthlyCost = seats * wholesalePrice;
  const monthlyRevenue = seats * resellPrice;
  const monthlyProfit = monthlyRevenue - monthlyCost;

  const yearlyCost = monthlyCost * 12;
  const yearlyRevenue = monthlyRevenue * 12;
  const yearlyProfit = monthlyProfit * 12;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Cost Estimator</Typography>
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <TextField
          type="number"
          label="Seats"
          value={seats}
          onChange={(e) => setSeats(parseInt(e.target.value || 0))}
        />
        <TextField
          type="number"
          label="Your Cost / seat"
          value={wholesalePrice}
          onChange={(e) => setWholesalePrice(parseFloat(e.target.value || 0))}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <TextField
          type="number"
          label="Resell Price / seat"
          value={resellPrice}
          onChange={(e) => setResellPrice(parseFloat(e.target.value || 0))}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography>Monthly cost: ${monthlyCost.toFixed(2)}</Typography>
        <Typography>Monthly revenue: ${monthlyRevenue.toFixed(2)}</Typography>
        <Typography fontWeight="bold">
          Monthly profit: ${monthlyProfit.toFixed(2)}
        </Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography>Yearly cost: ${yearlyCost.toFixed(2)}</Typography>
        <Typography>Yearly revenue: ${yearlyRevenue.toFixed(2)}</Typography>
        <Typography fontWeight="bold">
          Yearly profit: ${yearlyProfit.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

const WhiteLabelPage = () => {
  const [config, setConfig] = useState({
    brand_name: "",
    domain: "",
    logo_url: "",
    primary_color: "",
    secondary_color: "",
  });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const data = await getWhiteLabelConfig();
        setConfig(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchConfig();
  }, []);

  const handleChange = (field) => (e) => {
    setConfig({ ...config, [field]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateWhiteLabelConfig(config);
      toast.success("Saved!");
    } catch (err) {
      toast.error(err.message || "Failed to save");
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        White-Label Branding
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Your Brand. Your Domain. Your Glory.
      </Typography>

      <TextField
        fullWidth
        label="Brand Name"
        sx={{ mb: 2 }}
        value={config.brand_name || ""}
        onChange={handleChange("brand_name")}
      />
      <TextField
        fullWidth
        label="Domain"
        sx={{ mb: 2 }}
        value={config.domain || ""}
        onChange={handleChange("domain")}
      />
      <TextField
        fullWidth
        label="Logo URL"
        sx={{ mb: 2 }}
        value={config.logo_url || ""}
        onChange={handleChange("logo_url")}
      />
      <TextField
        fullWidth
        label="Primary Color"
        sx={{ mb: 2 }}
        value={config.primary_color || ""}
        onChange={handleChange("primary_color")}
      />
      <TextField
        fullWidth
        label="Secondary Color"
        sx={{ mb: 2 }}
        value={config.secondary_color || ""}
        onChange={handleChange("secondary_color")}
      />

      <Button variant="contained" onClick={handleSave} sx={{ mb: 4 }}>
        Save
      </Button>

      <CostEstimator />
    </Box>
  );
};

export default WhiteLabelPage;
