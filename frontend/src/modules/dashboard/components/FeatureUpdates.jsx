import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Grow, Grid } from "@mui/material";

const UPDATES = [
  { id: 1, title: "New Chart Widgets", desc: "Visualize your sales in new ways." },
  { id: 2, title: "Improved Reports", desc: "Generate PDFs in one click." },
  { id: 3, title: "Mobile App", desc: "Access analytics on the go." },
];

export default function FeatureUpdates() {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2}>
        {UPDATES.map((u, idx) => (
          <Grid item xs={12} md={4} key={u.id}>
            <Grow in={checked} style={{ transformOrigin: "0 0 0" }} timeout={300 + idx * 300}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {u.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {u.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grow>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
