import { Typography, Card, CardContent, Box, Grid } from "@mui/material";

const SalesStatsCard = ({ analytics }) => {
  return (
    <Grid item md={6} xs={12}>
      <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 2, mt: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
            Sales Stats
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body2"
                color="text.primary"
                sx={{ fontWeight: 500 }}
              >
                NUMBER OF RENTALS
              </Typography>
              <Typography
                variant="body2"
                fontWeight="bold"
                color="primary.main"
              >
                {analytics?.rentals_count?.toLocaleString() || "0"}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body2"
                color="text.primary"
                sx={{ fontWeight: 500 }}
              >
                NUMBER OF PURCHASES
              </Typography>
              <Typography
                variant="body2"
                fontWeight="bold"
                color="primary.main"
              >
                {analytics?.purchases_count?.toLocaleString() || "0"}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body2"
                color="text.primary"
                sx={{ fontWeight: 500 }}
              >
                EARNINGS FROM RENTALS
              </Typography>
              <Typography
                variant="body2"
                fontWeight="bold"
                color="primary.main"
              >
                ${analytics?.rentals_revenue?.toLocaleString() || "0"}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body2"
                color="text.primary"
                sx={{ fontWeight: 500 }}
              >
                EARNINGS FROM PURCHASES
              </Typography>
              <Typography
                variant="body2"
                fontWeight="bold"
                color="primary.main"
              >
                ${analytics?.purchases_revenue?.toLocaleString() || "0"}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default SalesStatsCard;
