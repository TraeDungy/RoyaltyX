import { Box, Button, Grid, Typography } from "@mui/material";
import { ArrowRight, Plus, WifiOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SourceItem } from "./SourceItem";

export const LinkedAccountsSection = ({ sources, loading }) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 3,
          mb: 1,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Linked Accounts
        </Typography>
        <Button variant="outlined" onClick={() => navigate("/sources")}>
          View All <ArrowRight className="ms-2" />
        </Button>
      </Box>

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
            <WifiOff size={40} className="txt-lighter" />
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
    </Box>
  );
};
