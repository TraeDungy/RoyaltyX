import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import {
  getWhiteLabelConfig,
  saveWhiteLabelConfig,
  estimateWhiteLabelCost,
} from "../api/whiteLabel";

function WhiteLabel() {
  const [form, setForm] = useState({
    brand_name: "",
    domain: "",
    logo_url: "",
    primary_color: "#1976d2",
    seat_cost: 30,
  });
  const [estimate, setEstimate] = useState(null);

  useEffect(() => {
    getWhiteLabelConfig().then((data) => {
      if (data.brand_name) {
        setForm(data);
      }
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const data = await saveWhiteLabelConfig(form);
    setForm(data);
  };

  const handleEstimate = async () => {
    const data = await estimateWhiteLabelCost(10, 50); // example values
    setEstimate(data);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        White-Label Branding
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Branding Settings
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                label="Brand Name"
                name="brand_name"
                value={form.brand_name}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Domain"
                name="domain"
                value={form.domain}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Logo URL"
                name="logo_url"
                value={form.logo_url}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Primary Color"
                name="primary_color"
                value={form.primary_color}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Seat Cost"
                name="seat_cost"
                type="number"
                value={form.seat_cost}
                onChange={handleChange}
              />
              <Button variant="contained" sx={{ mt: 2 }} onClick={handleSave}>
                Save
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Cost Estimator
              </Typography>
              <Button variant="outlined" onClick={handleEstimate}>
                Estimate Example
              </Button>
              {estimate && (
                <Box sx={{ mt: 2 }}>
                  <Typography>
                    Monthly Cost: ${estimate.monthly_cost.toFixed(2)}
                  </Typography>
                  <Typography>
                    Monthly Profit: ${estimate.monthly_profit.toFixed(2)}
                  </Typography>
                  <Typography>
                    Yearly Profit: ${estimate.yearly_profit.toFixed(2)}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default WhiteLabel;
