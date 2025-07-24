import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const ThemeSettings = () => {
  const { theme, setTheme, secondaryColor, setSecondaryColor } = useTheme();

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const handleColorChange = (event) => {
    setSecondaryColor(event.target.value);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        Theme Settings
      </Typography>

      <Typography variant="body1" sx={{ color: "text.secondary" }}>
        Choose your preferred theme for the application
      </Typography>

      <FormControl fullWidth sx={{ maxWidth: 300, mt: 3 }}>
        <InputLabel id="theme-select-label">Theme</InputLabel>
        <Select
          labelId="theme-select-label"
          id="theme-select"
          value={theme || "light"}
          label="Theme"
          onChange={handleThemeChange}
          sx={{
            "& .MuiSelect-select": {
              display: "flex",
              alignItems: "center",
              gap: 1,
            },
          }}
        >
          <MenuItem value="light">
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Sun size={18} color="#f59e0b" />
              <Typography>Light Theme</Typography>
            </Box>
          </MenuItem>
          <MenuItem value="dark">
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Moon size={18} color="#6366f1" />
              <Typography>Dark Theme</Typography>
            </Box>
          </MenuItem>
          <MenuItem value="matrix">
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography>Matrix</Typography>
            </Box>
          </MenuItem>
          <MenuItem value="desert">
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography>Desert</Typography>
            </Box>
          </MenuItem>
          <MenuItem value="camouflage">
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography>Camouflage</Typography>
            </Box>
          </MenuItem>
          <MenuItem value="sniper">
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography>Sniper</Typography>
            </Box>
          </MenuItem>
          <MenuItem value="cottonCandy">
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography>Cotton Candy</Typography>
            </Box>
          </MenuItem>
          <MenuItem value="pinky">
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography>Pinky</Typography>
            </Box>
          </MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ mt: 4 }}>
        <Typography variant="body1" sx={{ color: "text.secondary", mb: 1 }}>
          Secondary Color
        </Typography>
        <TextField
          type="color"
          value={secondaryColor}
          onChange={handleColorChange}
          sx={{ width: 80, p: 0 }}
        />
      </Box>

      <Typography
        variant="caption"
        sx={{ mt: 2, display: "block", color: "text.secondary" }}
      >
        The theme will be applied immediately and saved to your preferences.
      </Typography>
    </Box>
  );
};

export default ThemeSettings;
