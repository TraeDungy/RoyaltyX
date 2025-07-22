import { Card, CardContent, Typography, Box } from "@mui/material";

export const ForecastInsights = ({ forecasts }) => {
  if (!forecasts || forecasts.length === 0) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
        Forecast
      </Typography>
      <Card variant="outlined">
        <CardContent>
          {forecasts.map((item) => (
            <Box key={item.id} sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                {new Date(item.created_at).toLocaleDateString()}
              </Typography>
              <Typography variant="body2">{item.forecast}</Typography>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ForecastInsights;

