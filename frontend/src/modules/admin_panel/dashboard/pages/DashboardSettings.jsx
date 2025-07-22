import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Typography,
  Container,
} from "@mui/material";

const DEFAULTS = [
  { id: "analytics", label: "Show Analytics Quick Action" },
  { id: "products", label: "Show Products Quick Action" },
  { id: "sources", label: "Show Sources Quick Action" },
  { id: "reports", label: "Show Reports Quick Action" },
];

const STORAGE_KEY = "defaultQuickActions";

function DashboardSettings() {
  const [selected, setSelected] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEFAULTS.map((d) => d.id);
  });

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 3 }}>
        Dashboard Settings
      </Typography>
      <Card>
        <CardContent>
          {DEFAULTS.map((opt) => (
            <Box key={opt.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selected.includes(opt.id)}
                    onChange={() => toggle(opt.id)}
                  />
                }
                label={opt.label}
              />
            </Box>
          ))}
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleSave}>
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default DashboardSettings;
