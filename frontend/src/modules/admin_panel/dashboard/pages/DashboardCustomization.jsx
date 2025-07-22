import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { useSettings } from "../../../common/contexts/SettingsContext";

const AVAILABLE = [
  { id: "analytics", label: "Analytics" },
  { id: "reports", label: "Reports" },
  { id: "projects", label: "Projects" },
  { id: "sources", label: "Sources" },
  { id: "content", label: "Content" },
];

export default function DashboardCustomization() {
  const { favoriteAnalytics, toggleFavoriteAnalytics } = useSettings();
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Dashboard Customization
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Select default quick buttons for users.
      </Typography>
      <FormGroup>
        {AVAILABLE.map((item) => (
          <FormControlLabel
            key={item.id}
            control={
              <Checkbox
                checked={favoriteAnalytics.includes(item.id)}
                onChange={() => toggleFavoriteAnalytics(item.id)}
              />
            }
            label={item.label}
          />
        ))}
      </FormGroup>
    </Box>
  );
}
