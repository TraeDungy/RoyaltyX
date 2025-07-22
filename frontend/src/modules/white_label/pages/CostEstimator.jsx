import { useState } from "react";
import {
  Box,
  TextField,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import PageHeader from "../../common/components/PageHeader";

const CostEstimator = () => {
  const [seats, setSeats] = useState(10);
  const [wholesale, setWholesale] = useState(30);
  const [retail, setRetail] = useState(50);

  const monthlyCost = seats * wholesale;
  const monthlyRevenue = seats * retail;
  const monthlyProfit = monthlyRevenue - monthlyCost;

  const yearlyCost = monthlyCost * 12;
  const yearlyRevenue = monthlyRevenue * 12;
  const yearlyProfit = monthlyProfit * 12;

  return (
    <Box>
      <PageHeader title="Cost Estimator" description="Calculate your potential profit when reselling white-label seats." />

      <Grid container spacing={3} className="mt-2">
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            type="number"
            label="Seats"
            value={seats}
            onChange={(e) => setSeats(parseInt(e.target.value) || 0)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            type="number"
            label="Your Cost per Seat ($)"
            value={wholesale}
            onChange={(e) => setWholesale(parseFloat(e.target.value) || 0)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            type="number"
            label="Resale Price per Seat ($)"
            value={retail}
            onChange={(e) => setRetail(parseFloat(e.target.value) || 0)}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} className="mt-4">
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Monthly</Typography>
              <Typography>Cost: ${monthlyCost.toFixed(2)}</Typography>
              <Typography>Revenue: ${monthlyRevenue.toFixed(2)}</Typography>
              <Typography>Profit: ${monthlyProfit.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Yearly</Typography>
              <Typography>Cost: ${yearlyCost.toFixed(2)}</Typography>
              <Typography>Revenue: ${yearlyRevenue.toFixed(2)}</Typography>
              <Typography>Profit: ${yearlyProfit.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CostEstimator;
