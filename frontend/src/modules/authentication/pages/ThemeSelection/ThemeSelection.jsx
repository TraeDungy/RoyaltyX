import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Card,
  Typography,
  Box,
  Paper,
  IconButton,
  Stack,
  Fade,
  Zoom,
} from "@mui/material";
import { LightMode, DarkMode, CheckCircle } from "@mui/icons-material";
import { useTheme } from "../../../common/contexts/ThemeContext";
import { useAuth } from "../../../common/contexts/AuthContext";
import Button from "../../../common/components/Button";
import icon from "../../../common/assets/img/brand/icon-3.png";
import styles from "./ThemeSelection.module.css";

export default function ThemeSelection() {
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [loading, setLoading] = useState(false);
  const { setTheme } = useTheme();
  const { authenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    }
  }, [authenticated, navigate]);

  const handleThemeSelect = (themeMode) => {
    setSelectedTheme(themeMode);
  };

  const handleContinue = async () => {
    setLoading(true);

    try {
      setTheme(selectedTheme);
      navigate("/my-projects");
    } catch (error) {
      toast.error("Failed to apply theme. Please try again.");
    }

    setLoading(false);
  };

  const handleSkip = () => {
    navigate("/my-projects");
  };

  return (
    <div className={styles.themeSelectionWrapper}>
      {/* Animated background shapes */}
      <div className={styles.backgroundShapes}>
        <div className={`${styles.shape} ${styles.shape1}`}></div>
        <div className={`${styles.shape} ${styles.shape2}`}></div>
        <div className={`${styles.shape} ${styles.shape3}`}></div>
        <div className={`${styles.shape} ${styles.shape4}`}></div>
        <div className={`${styles.shape} ${styles.shape5}`}></div>
      </div>

      <Card
        style={{ maxWidth: 600 }}
        sx={{
          p: 5,
          boxShadow: 3,
          width: "100%",
          zIndex: 10,
          position: "relative",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <img
            src={icon}
            style={{ maxWidth: 70 }}
            className="mb-3 mx-auto d-block"
            alt="Brand Icon"
          />

          <Fade in timeout={800}>
            <Box>
              <Typography variant="h3" sx={{ mb: 2, fontWeight: 600 }}>
                Choose Your Theme
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", mb: 4 }}
              >
                Personalize your experience by selecting your preferred theme.
                You can always change this later in settings.
              </Typography>
            </Box>
          </Fade>
        </Box>

        {/* Theme Options */}
        <Stack direction="row" spacing={2} sx={{ mb: 4 }} flexWrap="wrap">
          {[
            { value: "light", label: "Light Theme", icon: <LightMode /> },
            { value: "dark", label: "Dark Theme", icon: <DarkMode /> },
            { value: "matrix", label: "Matrix" },
            { value: "desert", label: "Desert" },
            { value: "camouflage", label: "Camouflage" },
            { value: "sniper", label: "Sniper" },
            { value: "cottonCandy", label: "Cotton Candy" },
            { value: "pinky", label: "Pinky" },
          ].map((option) => (
            <Zoom in timeout={600} key={option.value}>
              <Paper
                elevation={selectedTheme === option.value ? 8 : 2}
                sx={{
                  flex: "1 0 120px",
                  p: 3,
                  textAlign: "center",
                  cursor: "pointer",
                  border: selectedTheme === option.value ? 2 : 1,
                  borderColor:
                    selectedTheme === option.value ? "primary.main" : "divider",
                  position: "relative",
                  mb: 2,
                }}
                onClick={() => handleThemeSelect(option.value)}
              >
                {selectedTheme === option.value && (
                  <CheckCircle
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      color: "primary.main",
                      fontSize: 24,
                    }}
                  />
                )}
                {option.icon && (
                  <IconButton sx={{ mb: 1 }}>{option.icon}</IconButton>
                )}
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  {option.label}
                </Typography>
              </Paper>
            </Zoom>
          ))}
        </Stack>

        {/* Action Buttons */}
        <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
          <Button
            variant="outlined"
            size="lg"
            onClick={handleSkip}
            disabled={loading}
            sx={{ flex: 1 }}
          >
            Skip for Now
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={handleContinue}
            loading={loading}
            sx={{ flex: 1 }}
          >
            Continue
          </Button>
        </Stack>

        {/* Additional Info */}
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            💡 You can change your theme preference anytime in your account
            settings
          </Typography>
        </Box>
      </Card>
    </div>
  );
}
