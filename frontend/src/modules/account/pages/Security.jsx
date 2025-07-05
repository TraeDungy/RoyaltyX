import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField,
  Switch,
  Divider,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Shield,
  Lock,
  Smartphone,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

function SecurityPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changePasswordDialog, setChangePasswordDialog] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const securityFeatures = [
    {
      title: "Two-Factor Authentication",
      description: "Add an extra layer of security to your account",
      icon: <Smartphone size={20} color="currentColor" />,
      enabled: twoFactorEnabled,
      action: () => setTwoFactorEnabled(!twoFactorEnabled),
    },
    {
      title: "Email Notifications",
      description: "Get notified about important security events",
      icon: <Mail size={20} color="currentColor" />,
      enabled: emailNotifications,
      action: () => setEmailNotifications(!emailNotifications),
    },
    {
      title: "Login Alerts",
      description: "Receive alerts for new device logins",
      icon: <ShieldCheck size={20} color="currentColor" />,
      enabled: loginAlerts,
      action: () => setLoginAlerts(!loginAlerts),
    },
  ];

  const recentActivity = [
    {
      action: "Password changed",
      date: "2024-01-15",
      location: "New York, US",
      status: "success",
    },
    {
      action: "Login from new device",
      date: "2024-01-10",
      location: "London, UK",
      status: "warning",
    },
    {
      action: "Account created",
      date: "2024-01-01",
      location: "New York, US",
      status: "success",
    },
  ];

  const handlePasswordChange = (field, value) => {
    setPasswordForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePasswordSubmit = () => {
    // Mock password change logic
    console.log("Password change submitted:", passwordForm);
    setChangePasswordDialog(false);
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return <CheckCircle size={20} color="green" />;
      case "warning":
        return <AlertTriangle size={20} color="orange" />;
      default:
        return <Shield size={20} color="blue" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "success";
      case "warning":
        return "warning";
      default:
        return "primary";
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Security Settings
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Password Section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Lock
                  size={20}
                  color="currentColor"
                  style={{ marginRight: 16, color: "primary.main" }}
                />
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Password
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Keep your account secure with a strong password
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 3 }}
                fullWidth
                onClick={() => setChangePasswordDialog(true)}
              >
                Change Password
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Security Features */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Shield
                  size={20}
                  color="currentColor"
                  style={{ marginRight: 16, color: "primary.main" }}
                />
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Security Features
                </Typography>
              </Box>
              <List sx={{ p: 0 }}>
                {securityFeatures.map((feature, index) => (
                  <Box key={feature.title}>
                    <ListItem sx={{ px: 0, py: 2 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        {feature.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle2">
                            {feature.title}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2" color="text.secondary">
                            {feature.description}
                          </Typography>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={feature.enabled}
                          onChange={feature.action}
                          color="primary"
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index < securityFeatures.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Security Status */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
                Security Status
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Alert severity="success" sx={{ height: "100%" }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                      Strong Password
                    </Typography>
                    <Typography variant="body2">
                      Your password meets security requirements
                    </Typography>
                  </Alert>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Alert
                    severity={twoFactorEnabled ? "success" : "warning"}
                    sx={{ height: "100%" }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                      Two-Factor Authentication
                    </Typography>
                    <Typography variant="body2">
                      {twoFactorEnabled ? "Enabled and active" : "Not enabled"}
                    </Typography>
                  </Alert>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Alert severity="info" sx={{ height: "100%" }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                      Account Activity
                    </Typography>
                    <Typography variant="body2">
                      Regular monitoring active
                    </Typography>
                  </Alert>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
                Recent Security Activity
              </Typography>
              <List sx={{ p: 0 }}>
                {recentActivity.map((activity, index) => (
                  <Box key={index}>
                    <ListItem sx={{ px: 0, py: 2 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        {getStatusIcon(activity.status)}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle2">
                            {activity.action}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2" color="text.secondary">
                            {activity.location} •{" "}
                            {new Date(activity.date).toLocaleDateString()}
                          </Typography>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Chip
                          label={activity.status}
                          color={getStatusColor(activity.status)}
                          size="small"
                          variant="outlined"
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index < recentActivity.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Change Password Dialog */}
      <Dialog
        open={changePasswordDialog}
        onClose={() => setChangePasswordDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Current Password"
              type={showCurrentPassword ? "text" : "password"}
              value={passwordForm.currentPassword}
              onChange={(e) =>
                handlePasswordChange("currentPassword", e.target.value)
              }
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <Button
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    sx={{ minWidth: "auto", p: 1 }}
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </Button>
                ),
              }}
            />
            <TextField
              fullWidth
              label="New Password"
              type={showNewPassword ? "text" : "password"}
              value={passwordForm.newPassword}
              onChange={(e) =>
                handlePasswordChange("newPassword", e.target.value)
              }
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <Button
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    sx={{ minWidth: "auto", p: 1 }}
                  >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              type={showConfirmPassword ? "text" : "password"}
              value={passwordForm.confirmPassword}
              onChange={(e) =>
                handlePasswordChange("confirmPassword", e.target.value)
              }
              InputProps={{
                endAdornment: (
                  <Button
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    sx={{ minWidth: "auto", p: 1 }}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </Button>
                ),
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setChangePasswordDialog(false)}>Cancel</Button>
          <Button
            onClick={handlePasswordSubmit}
            variant="contained"
            disabled={
              !passwordForm.currentPassword ||
              !passwordForm.newPassword ||
              passwordForm.newPassword !== passwordForm.confirmPassword
            }
          >
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default SecurityPage;
