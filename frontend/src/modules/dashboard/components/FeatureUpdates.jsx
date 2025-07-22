import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import { Gift, X } from "lucide-react";

const FEATURES = [
  {
    id: 1,
    title: "New Analytics Views",
    description: "Explore our improved analytics section with fresh insights.",
  },
  {
    id: 2,
    title: "Enhanced Connectivity",
    description: "Easily link external sources with the new connection flow.",
  },
];

export const FeatureUpdates = () => {
  const [dismissed, setDismissed] = useState([]);

  const handleDismiss = (id) => {
    setDismissed((prev) => [...prev, id]);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        What's New
      </Typography>
      <Grid container spacing={2}>
        {FEATURES.map((feature) => (
          <Grid item xs={12} sm={6} key={feature.id}>
            <Collapse in={!dismissed.includes(feature.id)}>
              <Card elevation={3}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Gift
                      size={28}
                      style={{ marginRight: 12 }}
                      color="#1976d2"
                    />
                    <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                      {feature.title}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleDismiss(feature.id)}
                    >
                      <X size={16} />
                    </IconButton>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {feature.description}
                  </Typography>
                  <Button
                    variant="text"
                    size="small"
                    sx={{ mt: 1 }}
                    onClick={() => {}}
                  >
                    Learn more
                  </Button>
                </CardContent>
              </Card>
            </Collapse>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeatureUpdates;
