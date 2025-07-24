import { Box, Stepper, Step, StepLabel, Typography, Card, CardContent, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../common/contexts/AuthContext";
import { useSources } from "../../sources/api/sources";

function Onboarding() {
  const navigate = useNavigate();
  const { subscriptionPlan } = useAuth();
  const { sources } = useSources();

  const activeStep = !subscriptionPlan || subscriptionPlan === "free"
    ? 0
    : sources && sources.length === 0
    ? 1
    : 2;

  const steps = ["Choose a plan", "Connect sources", "Explore analytics"];

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 4, fontWeight: "bold" }}>
        Getting Started
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 6 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 500, mb: 1 }}>
                1. Choose a plan
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                Select the subscription plan that best fits your needs.
              </Typography>
              <Button variant="contained" onClick={() => navigate("/account/membership")}>View Plans</Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 500, mb: 1 }}>
                2. Connect sources
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                Link your platforms to start importing data.
              </Typography>
              <Button variant="contained" onClick={() => navigate("/sources")}>Add Source</Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 500, mb: 1 }}>
                3. Explore analytics
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                Dive into charts and insights to track performance.
              </Typography>
              <Button variant="contained" onClick={() => navigate("/analytics")}>View Dashboard</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Onboarding;
