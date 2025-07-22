import { Typography, Card, CardContent, Box, Grid } from "@mui/material";

const YoutubeAnalyticsCard = ({ data }) => {
  if (!data) return null;
  const { statistics = {}, analytics = {} } = data;

  const formatNumber = (num) => new Intl.NumberFormat("en-US").format(num);
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    return `${formatNumber(minutes)} min`;
  };

  return (
    <Grid size={{ md: 6, xs: 12 }}>
      <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 2, mt: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
            YouTube Channel Stats
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>
                SUBSCRIBERS
              </Typography>
              <Typography variant="body2" fontWeight="bold" color="primary.main">
                {formatNumber(statistics.subscriberCount || 0)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>
                TOTAL CHANNEL VIEWS
              </Typography>
              <Typography variant="body2" fontWeight="bold" color="primary.main">
                {formatNumber(statistics.viewCount || 0)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>
                VIDEOS
              </Typography>
              <Typography variant="body2" fontWeight="bold" color="primary.main">
                {formatNumber(statistics.videoCount || 0)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>
                VIEWS (LAST 30 DAYS)
              </Typography>
              <Typography variant="body2" fontWeight="bold" color="primary.main">
                {formatNumber(analytics.views || 0)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>
                WATCH TIME (MIN)
              </Typography>
              <Typography variant="body2" fontWeight="bold" color="primary.main">
                {formatNumber(analytics.estimatedMinutesWatched || 0)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>
                AVG VIEW DURATION
              </Typography>
              <Typography variant="body2" fontWeight="bold" color="primary.main">
                {formatDuration(analytics.averageViewDuration || 0)}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default YoutubeAnalyticsCard;
