import { Box, Button, Card, Grid, Typography } from "@mui/material";
import youtubeLogo from "../../common/assets/img/platform_logos/youtube.webp";
import { ArrowRight } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

export const SourceItem = ({ source }) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/sources/${source.id}`);
  };

  return (
    <Grid sx={{ width: "100%" }}>
      <Card sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid container spacing={2} alignItems="center">
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pr: 1,
              }}
            >
              <img
                src={youtubeLogo}
                alt="YouTube Logo"
                style={{ height: "40px", objectFit: "contain" }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                Nenad Blagov
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  <span className="fw-500">Last fetched:</span>{" "}
                  {source.last_fetched_at || "Never"}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  <span className="fw-500">Platform:</span> {source.platform}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button variant="outlined" color="primary" onClick={handleViewClick}>
              View <ArrowRight className="ms-2" />
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};
