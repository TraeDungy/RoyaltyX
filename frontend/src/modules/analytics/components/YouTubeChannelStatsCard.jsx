import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { getYouTubeChannelStats } from "../api/analytics";

const YouTubeChannelStatsCard = ({ sourceId, accountName }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!sourceId) return;
    const fetchStats = async () => {
      try {
        const data = await getYouTubeChannelStats(sourceId);
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch channel stats", error);
      }
    };
    fetchStats();
  }, [sourceId]);

  if (!stats) {
    return null;
  }

  const formatNumber = (value) => {
    return new Intl.NumberFormat("en-US").format(Number(value));
  };

  return (
    <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 2, mt: 4 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          {accountName} Channel Stats
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="body2">
            Subscribers: {formatNumber(stats.subscriberCount)}
          </Typography>
          <Typography variant="body2">
            Views: {formatNumber(stats.viewCount)}
          </Typography>
          <Typography variant="body2">
            Videos: {formatNumber(stats.videoCount)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default YouTubeChannelStatsCard;
