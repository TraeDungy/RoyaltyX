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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Shield, Lock, Mail, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { changePassword } from "../api/user";

function SecurityPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changePasswordDialog, setChangePasswordDialog] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const securityFeatures = [
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

  const handlePasswordChange = (field, value) => {
    setPasswordForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePasswordSubmit = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await changePassword(
        passwordForm.currentPassword,
        passwordForm.newPassword
      );
      setSuccess("Password changed successfully!");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => {
        setChangePasswordDialog(false);
        setSuccess("");
      }, 2000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = () => {
    setChangePasswordDialog(false);
    setError("");
    setSuccess("");
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
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
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
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
      </Grid>

      {/* Change Password Dialog */}
      <Dialog
        open={changePasswordDialog}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle variant="h4" sx={{ mt: 1 }}>
          Change Password
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}
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
              helperText="Password must be at least 8 characters long"
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
          <Button onClick={handleDialogClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handlePasswordSubmit}
            variant="contained"
            disabled={
              loading ||
              !passwordForm.currentPassword ||
              !passwordForm.newPassword ||
              passwordForm.newPassword.length < 8 ||
              passwordForm.newPassword !== passwordForm.confirmPassword
            }
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? "Changing..." : "Change Password"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default SecurityPage;
