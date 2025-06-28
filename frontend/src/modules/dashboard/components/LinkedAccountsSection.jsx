import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { Plus, WifiOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SourceItem } from "./SourceItem";

export const LinkedAccountsSection = ({ sources, loading }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: "bold" }}>
          Linked Accounts
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Manage your linked accounts to streamline your workflow and access all
          your tools in one place.
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Typography variant="body1">Loading...</Typography>
          </Box>
        ) : sources?.length > 0 ? (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {sources.map((source, index) => (
              <SourceItem source={source} key={index} />
            ))}
          </Grid>
        ) : (
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
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => navigate("/sources")}
              >
                <Plus className="me-2" /> Add data source
              </Button>
            </Box>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};
