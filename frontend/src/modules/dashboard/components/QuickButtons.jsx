import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  Stack,
  IconButton,
} from "@mui/material";
import { Settings as SettingsIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSettings } from "../../common/contexts/SettingsContext";

const AVAILABLE = [
  { id: "analytics", label: "Analytics", path: "/analytics" },
  { id: "reports", label: "Reports", path: "/reports" },
  { id: "projects", label: "Projects", path: "/my-projects" },
  { id: "sources", label: "Sources", path: "/sources" },
  { id: "content", label: "Content", path: "/content" },
];

export default function QuickButtons() {
  const navigate = useNavigate();
  const { favoriteAnalytics, toggleFavoriteAnalytics } = useSettings();
  const [open, setOpen] = useState(false);

  const buttons = AVAILABLE.filter((b) => favoriteAnalytics.includes(b.id));

  return (
    <Box sx={{ mb: 3 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        {buttons.map((btn) => (
          <Button
            key={btn.id}
            variant="contained"
            onClick={() => navigate(btn.path)}
            sx={{ textTransform: "none" }}
          >
            {btn.label}
          </Button>
        ))}
        <IconButton onClick={() => setOpen(true)} size="small">
          <SettingsIcon size={18} />
        </IconButton>
      </Stack>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Select Quick Buttons</DialogTitle>
        <DialogContent>
          <Stack>
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
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
