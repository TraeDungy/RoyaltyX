import { useState, useEffect } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Container,
  Snackbar,
} from "@mui/material";
import { X, ArrowUp, ArrowDown, Check } from "lucide-react";
import { useAuth } from "../../common/contexts/AuthContext";
import { changeSubscriptionPlan } from "../api/subscription";
import { createCheckoutSession } from "../api/payments";
import { verifySession } from "../api/payments";

function MembershipPage() {
  const { subscriptionPlan, setSubscriptionPlan } = useAuth();
  const [upgradeDialog, setUpgradeDialog] = useState(false);
  const [cancelDialog, setCancelDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [currentPlan, setCurrentPlan] = useState(subscriptionPlan || "discovery");

  const plans = [
    {
      name: "discovery",
      displayName: "Discovery",
      price: "$19",
      period: "per month after 30-day trial",
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
    },
    {
      name: "professional",
      displayName: "Professional",
      price: "$49",
      period: "per month",
      description: "Best for growing businesses",
      features: [
        "Up to 15 projects",
        "50GB storage",
        "Advanced analytics",
        "Priority support",
        "Custom templates",
        "API access",
        "Team collaboration",
      ],
      limitations: [],
      popular: true,
    },
    {
      name: "premium",
      displayName: "Premium",
      price: "$99",
      period: "per month",
      description: "For large organizations",
      features: [
        "Unlimited projects",
        "500GB storage",
        "Enterprise analytics",
        "24/7 phone support",
        "Custom integrations",
        "White-label options",
        "Advanced security",
        "Dedicated account manager",
      ],
      limitations: [],
      popular: false,
    },
    {
      name: "enterprise",
      displayName: "Enterprise",
      price: "Contact",
      period: "",
      description: "Custom solutions for large teams",
      features: [
        "Unlimited projects",
        "All integrations",
        "Dedicated support",
        "Custom pricing tools",
      ],
      limitations: [],
      popular: false,
    },
  ];

  useEffect(() => {
    setCurrentPlan(subscriptionPlan || "discovery");
  }, [subscriptionPlan]);

  // Handle return from Stripe checkout
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    const status = urlParams.get('status');

    if (sessionId && status === 'success') {
      // Verify the session and show success message
      verifySession(sessionId)
        .then((response) => {
          if (response.status === 'success') {
            setSnackbar({
              open: true,
              message: response.message || 'Payment successful! Your subscription has been activated.',
              severity: 'success'
            });
            // Refresh user data to get updated subscription plan
            window.location.reload();
          }
        })
        .catch((error) => {
          setSnackbar({
            open: true,
            message: error.message || 'Payment completed but verification failed. Please contact support.',
            severity: 'warning'
          });
        });
      
      // Clean up URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (status === 'cancelled') {
      setSnackbar({
        open: true,
        message: 'Payment was cancelled. You can try again anytime.',
        severity: 'info'
      });
      
      // Clean up URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleUpgrade = (plan) => {
    setSelectedPlan(plan);
    setUpgradeDialog(true);
  };

  const confirmUpgrade = async () => {
    if (!selectedPlan) return;

    setLoading(true);
    try {
      // For paid plans, create checkout session and redirect to Stripe
      if (selectedPlan.name !== "discovery") {
        const response = await createCheckoutSession(selectedPlan.name);
        
        // Redirect to Stripe checkout
        window.location.href = response.checkout_url;
        return;
      }
      
      // For discovery plan (downgrade), handle directly
      const response = await changeSubscriptionPlan(selectedPlan.name);
      setCurrentPlan(selectedPlan.name);
      setSubscriptionPlan(selectedPlan.name);
      setSnackbar({
        open: true,
        message:
          response.message ||
          `Successfully changed to ${selectedPlan.displayName}!`,
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to process plan change",
        severity: "error",
      });
    } finally {
      setLoading(false);
      setUpgradeDialog(false);
      setSelectedPlan(null);
    }
  };

  const handleDowngrade = (plan) => {
    setSelectedPlan(plan);
    setCancelDialog(true);
  };

  const confirmDowngrade = async () => {
    if (!selectedPlan) return;

    setLoading(true);
    try {
      const response = await changeSubscriptionPlan(selectedPlan.name);
      setCurrentPlan(selectedPlan.name);
      setSubscriptionPlan(selectedPlan.name);
      setSnackbar({
        open: true,
        message:
          response.message ||
          `Successfully changed to ${selectedPlan.displayName}!`,
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to change plan",
        severity: "error",
      });
    } finally {
      setLoading(false);
      setCancelDialog(false);
      setSelectedPlan(null);
    }
  };

  return (
    <Container>
      <Box>
        <Typography variant="h3" sx={{ mb: 5, fontWeight: "bold" }}>
          Available Plans
        </Typography>
        <Grid container spacing={3}>
          {plans.map((plan) => (
            <Grid item xs={12} md={4} key={plan.name}>
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
                      zIndex: 9,
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
                      {plan.displayName}
                      {currentPlan === plan.name && (
                        <Chip
                          label="Current Plan"
                          color="primary"
                          size="small"
                          sx={{ ml: 1 }}
                        />
                      )}
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
                          <Check color="#0bb050" />
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

                  <Box sx={{ mt: 2 }}>
                    {currentPlan === plan.name ? (
                      <Button variant="outlined" fullWidth disabled>
                        Current Plan
                      </Button>
                    ) : currentPlan === "discovery" && plan.name !== "discovery" ? (
                      <Button
                        variant={plan.popular ? "contained" : "outlined"}
                        fullWidth
                        startIcon={<ArrowUp size={16} />}
                        onClick={() => handleUpgrade(plan)}
                        disabled={loading}
                      >
                        Upgrade
                      </Button>
                    ) : currentPlan !== "discovery" && plan.name === "discovery" ? (
                      <Button
                        variant="outlined"
                        color="error"
                        fullWidth
                        startIcon={<ArrowDown size={16} />}
                        onClick={() => handleDowngrade(plan)}
                        disabled={loading}
                      >
                        Downgrade to Discovery
                      </Button>
                    ) : currentPlan !== "discovery" &&
                      plan.name !== "discovery" &&
                      plan.name !== currentPlan ? (
                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={
                          plan.name === "premium" ? (
                            <ArrowUp size={16} />
                          ) : (
                            <ArrowDown size={16} />
                          )
                        }
                        onClick={() => handleUpgrade(plan)}
                        disabled={loading}
                      >
                        {plan.name === "premium" ? "Upgrade" : "Change Plan"}
                      </Button>
                    ) : null}
                  </Box>
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
        <DialogTitle variant="h4">
          {selectedPlan && `Change to ${selectedPlan.displayName}`}
        </DialogTitle>
        <DialogContent>
          {selectedPlan && (
            <Box>
              <Typography variant="body1">
                You're about to change to the {selectedPlan.displayName} plan
                for <strong>{selectedPlan.price}</strong> {selectedPlan.period}.
              </Typography>
              <Alert severity="info" sx={{ my: 2 }}>
                <Typography variant="body2">
                  Your new plan will be active immediately, and you'll be
                  charged a prorated amount for the remainder of your current
                  billing cycle.
                </Typography>
              </Alert>
              <Typography variant="h5" sx={{ mt: 3, mb: 1, fontWeight: 500 }}>
                What you'll get:
              </Typography>
              <List sx={{ p: 0 }}>
                {selectedPlan.features.slice(0, 4).map((feature, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Check color="#0bb050" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body1">{feature}</Typography>
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
          <Button
            onClick={confirmUpgrade}
            variant="contained"
            disabled={loading}
          >
            {loading ? "Processing..." : "Confirm Change"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Downgrade Dialog */}
      <Dialog
        open={cancelDialog}
        onClose={() => setCancelDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Change to Discovery Plan</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            <Typography variant="body2">
              Are you sure you want to downgrade to the Discovery plan? You'll lose
              access to premium features immediately.
            </Typography>
          </Alert>
          <Typography variant="body2">
            Your account will be downgraded to the Discovery plan and you'll lose
            access to:
          </Typography>
          <List sx={{ mt: 1 }}>
            <ListItem sx={{ px: 0, py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <X size={16} color="red" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2">Advanced analytics</Typography>
                }
              />
            </ListItem>
            <ListItem sx={{ px: 0, py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <X size={16} color="red" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2">Priority support</Typography>
                }
              />
            </ListItem>
            <ListItem sx={{ px: 0, py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <X size={16} color="red" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2">Additional storage</Typography>
                }
              />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialog(false)}>
            Keep Current Plan
          </Button>
          <Button
            onClick={confirmDowngrade}
            variant="contained"
            color="error"
            disabled={loading}
          >
            {loading ? "Processing..." : "Downgrade to Discovery"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default MembershipPage;
