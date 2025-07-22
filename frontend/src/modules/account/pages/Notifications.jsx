import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Switch,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import {
  getNotificationPreferences,
  updateNotificationPreferences,
} from "../api/notificationPreferences";

function NotificationsPage() {
  const [prefs, setPrefs] = useState({
    email_notifications: true,
    sms_notifications: false,
    in_app_notifications: true,
    phone_number: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrefs = async () => {
      try {
        const data = await getNotificationPreferences();
        setPrefs(data);
      } catch (error) {
        console.error("Failed to load preferences", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrefs();
  }, []);

  const handleChange = (field, value) => {
    setPrefs((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await updateNotificationPreferences(prefs);
      alert("Preferences updated");
    } catch (error) {
      console.error("Failed to update", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Notification Preferences
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography>Email Notifications</Typography>
                <Switch
                  checked={prefs.email_notifications}
                  onChange={(e) => handleChange("email_notifications", e.target.checked)}
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography>SMS Notifications</Typography>
                <Switch
                  checked={prefs.sms_notifications}
                  onChange={(e) => handleChange("sms_notifications", e.target.checked)}
                />
              </Box>
              {prefs.sms_notifications && (
                <TextField
                  label="Phone Number"
                  value={prefs.phone_number || ""}
                  onChange={(e) => handleChange("phone_number", e.target.value)}
                  fullWidth
                  sx={{ mb: 2 }}
                />
              )}
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography>In-App Notifications</Typography>
                <Switch
                  checked={prefs.in_app_notifications}
                  onChange={(e) => handleChange("in_app_notifications", e.target.checked)}
                />
              </Box>
              <Button variant="contained" onClick={handleSave} disabled={loading}>
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default NotificationsPage;
