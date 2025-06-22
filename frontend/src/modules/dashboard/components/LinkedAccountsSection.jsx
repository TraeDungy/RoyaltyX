import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { Plus, WifiOff } from "lucide-react";

export const LinkedAccountsSection = () => {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Linked Accounts
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Manage your linked accounts to streamline your workflow and access all
          your tools in one place.
        </Typography>

        <Grid
          item
          md={12}
          lg={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "center",
            mt: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <WifiOff size={60} color="var(--color-primary)" />
            <Typography sx={{ mt: 1 }}>No accounts linked yet.</Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              <Plus className="me-2" /> Add data source
            </Button>
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};
