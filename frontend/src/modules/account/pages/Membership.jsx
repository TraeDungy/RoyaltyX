import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  LinearProgress,
  Container,
} from "@mui/material";
import {
  Check,
  X,
  ArrowUp,
  X as Cancel,
  TrendingUp,
  HardDrive,
  Zap,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function MembershipPage() {
  const navigate = useNavigate();
  const [upgradeDialog, setUpgradeDialog] = useState(false);
  const [cancelDialog, setCancelDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Mock current subscription data
  const currentSubscription = {
    plan: "Pro",
    status: "Active",
    nextBilling: "2024-02-15",
    amount: "$29.99",
    period: "monthly",
    usage: {
      storage: { used: 45, total: 100, unit: "GB" },
      projects: { used: 8, total: 25 },
      reports: { used: 150, total: 500 },
    },
  };

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "Up to 3 projects",
        "5GB storage",
        "Basic analytics",
        "Email support",
        "Standard templates",
      ],
      limitations: [
        "Limited integrations",
        "Basic reporting",
        "Community support only",
      ],
      popular: false,
      current: false,
    },
    {
      name: "Pro",
      price: "$29.99",
      period: "per month",
      description: "Best for growing businesses",
      features: [
        "Up to 25 projects",
        "100GB storage",
        "Advanced analytics",
        "Priority support",
        "Custom templates",
        "API access",
        "Team collaboration",
        "Advanced reporting",
      ],
      limitations: [],
      popular: true,
      current: true,
    },
    {
      name: "Enterprise",
      price: "$99.99",
      period: "per month",
      description: "For large organizations",
      features: [
        "Unlimited projects",
        "1TB storage",
        "Enterprise analytics",
        "24/7 phone support",
        "Custom integrations",
        "White-label options",
        "Advanced security",
        "Dedicated account manager",
        "Custom contracts",
      ],
      limitations: [],
      popular: false,
      current: false,
    },
  ];

  const handleUpgrade = (plan) => {
    setSelectedPlan(plan);
    setUpgradeDialog(true);
  };

  const confirmUpgrade = () => {
    console.log("Upgrading to:", selectedPlan.name);
    setUpgradeDialog(false);
    setSelectedPlan(null);
  };

  const handleCancel = () => {
    setCancelDialog(true);
  };

  const confirmCancel = () => {
    console.log("Cancelling subscription");
    setCancelDialog(false);
  };

  const getUsagePercentage = (used, total) => {
    return (used / total) * 100;
  };

  const getUsageColor = (percentage) => {
    if (percentage >= 90) return "error";
    if (percentage >= 70) return "warning";
    return "primary";
  };

  return (
    <Container>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Button
          onClick={() => navigate("/account")}
          sx={{ mr: 2, minWidth: "auto", p: 1 }}
        >
          <ArrowLeft style={{ marginRight: 8 }} /> Return to account
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Current Subscription */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Current Plan
                </Typography>
              </Box>

              <Box sx={{ textAlign: "center", mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                  {currentSubscription.plan}
                </Typography>
                <Chip
                  label={currentSubscription.status}
                  color="success"
                  sx={{ mb: 2 }}
                />
                <Typography variant="h5" sx={{ fontWeight: 500, mb: 1 }}>
                  {currentSubscription.amount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  billed {currentSubscription.period}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
                Next billing date
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {new Date(currentSubscription.nextBilling).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </Typography>

              <Button
                variant="outlined"
                color="error"
                fullWidth
                startIcon={<Cancel />}
                onClick={handleCancel}
              >
                Cancel Subscription
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Usage Statistics */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
                Usage Overview
              </Typography>

              <Grid container spacing={3}>
                <Grid size={{ md: 4, xs: 12 }}>
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <HardDrive
                        size={16}
                        color="currentColor"
                        style={{ marginRight: 8, color: "text.secondary" }}
                      />
                      <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                        Storage
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {currentSubscription.usage.storage.used} /{" "}
                      {currentSubscription.usage.storage.total}{" "}
                      {currentSubscription.usage.storage.unit}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={getUsagePercentage(
                        currentSubscription.usage.storage.used,
                        currentSubscription.usage.storage.total
                      )}
                      color={getUsageColor(
                        getUsagePercentage(
                          currentSubscription.usage.storage.used,
                          currentSubscription.usage.storage.total
                        )
                      )}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                </Grid>

                <Grid size={{ md: 4, xs: 12 }}>
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <TrendingUp sx={{ mr: 1, color: "text.secondary" }} />
                      <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                        Projects
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {currentSubscription.usage.projects.used} /{" "}
                      {currentSubscription.usage.projects.total}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={getUsagePercentage(
                        currentSubscription.usage.projects.used,
                        currentSubscription.usage.projects.total
                      )}
                      color={getUsageColor(
                        getUsagePercentage(
                          currentSubscription.usage.projects.used,
                          currentSubscription.usage.projects.total
                        )
                      )}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                </Grid>

                <Grid size={{ md: 4, xs: 12 }}>
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Zap
                        size={16}
                        color="currentColor"
                        style={{ marginRight: 8, color: "text.secondary" }}
                      />
                      <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                        Reports
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {currentSubscription.usage.reports.used} /{" "}
                      {currentSubscription.usage.reports.total}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={getUsagePercentage(
                        currentSubscription.usage.reports.used,
                        currentSubscription.usage.reports.total
                      )}
                      color={getUsageColor(
                        getUsagePercentage(
                          currentSubscription.usage.reports.used,
                          currentSubscription.usage.reports.total
                        )
                      )}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                </Grid>
              </Grid>

              <Alert severity="info" sx={{ mt: 3 }}>
                <Typography variant="body2">
                  You're using{" "}
                  {Math.round(
                    getUsagePercentage(
                      currentSubscription.usage.storage.used,
                      currentSubscription.usage.storage.total
                    )
                  )}
                  % of your storage limit. Consider upgrading if you need more
                  space.
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>

        {/* Available Plans */}
      </Grid>

      <Box>
        <Typography variant="h3" sx={{ mt: 8, mb: 3 }}>
          Available Plans
        </Typography>
        <Grid container spacing={3}>
          {plans.map((plan) => (
            <Grid size={{ xs: 12, md: 4 }} key={plan.name}>
              <Card
                sx={{
                  height: "100%",
                  position: "relative",
                  overflow: "visible",
                  border: plan.current ? 2 : 1,
                  borderColor: plan.current ? "primary.main" : "divider",
                  ...(plan.popular && {
                    transform: "scale(1.05)",
                    zIndex: 1,
                  }),
                }}
              >
                {plan.popular && (
                  <Chip
                    label="Most Popular"
                    color="primary"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 9
                    }}
                  />
                )}
                <CardContent
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ textAlign: "center", mb: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                      {plan.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {plan.description}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                      {plan.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {plan.period}
                    </Typography>
                  </Box>

                  <List sx={{ flexGrow: 1, p: 0 }}>
                    {plan.features.map((feature, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Check color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2">{feature}</Typography>
                          }
                        />
                      </ListItem>
                    ))}
                    {plan.limitations.map((limitation, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <X size={16} color="red" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2" color="text.secondary">
                              {limitation}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>

                  {plan.name !== "Free" && (
                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant={plan.popular ? "contained" : "outlined"}
                        fullWidth
                        startIcon={<ArrowUp size={16} />}
                        onClick={() => handleUpgrade(plan)}
                      >
                        Upgrade
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Upgrade Dialog */}
      <Dialog
        open={upgradeDialog}
        onClose={() => setUpgradeDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedPlan && `Upgrade to ${selectedPlan.name}`}
        </DialogTitle>
        <DialogContent>
          {selectedPlan && (
            <Box>
              <Typography variant="body1" sx={{ mb: 2 }}>
                You're about to upgrade to the {selectedPlan.name} plan for{" "}
                <strong>{selectedPlan.price}</strong> {selectedPlan.period}.
              </Typography>
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  Your new plan will be active immediately, and you'll be
                  charged a prorated amount for the remainder of your current
                  billing cycle.
                </Typography>
              </Alert>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
                What you'll get:
              </Typography>
              <List sx={{ p: 0 }}>
                {selectedPlan.features.slice(0, 4).map((feature, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Check color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body2">{feature}</Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUpgradeDialog(false)}>Cancel</Button>
          <Button onClick={confirmUpgrade} variant="contained">
            Confirm Upgrade
          </Button>
        </DialogActions>
      </Dialog>

      {/* Cancel Dialog */}
      <Dialog
        open={cancelDialog}
        onClose={() => setCancelDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Cancel Subscription</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            <Typography variant="body2">
              Are you sure you want to cancel your subscription? You'll lose
              access to Pro features at the end of your current billing period.
            </Typography>
          </Alert>
          <Typography variant="body2">
            Your subscription will remain active until{" "}
            <strong>
              {new Date(currentSubscription.nextBilling).toLocaleDateString()}
            </strong>
            , after which you'll be moved to the Free plan.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialog(false)}>
            Keep Subscription
          </Button>
          <Button onClick={confirmCancel} variant="contained" color="error">
            Cancel Subscription
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default MembershipPage;
