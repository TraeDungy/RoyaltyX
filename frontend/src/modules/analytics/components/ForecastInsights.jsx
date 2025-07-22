import { Box, Card, CardContent, Typography } from "@mui/material";

const ForecastInsights = ({ forecasts }) => {
  if (!forecasts || forecasts.length === 0) return null;

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" sx={{ mt: 4, mb: 2 }}>
        Forecast Insights
      </Typography>
      {forecasts.map((f) => (
        <Card key={f.id} sx={{ mb: 2 }} variant="outlined">
          <CardContent>
            <Typography variant="body2">{f.forecast}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ForecastInsights;
