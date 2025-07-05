import { Box, Card, CardContent, Chip, Typography } from "@mui/material";

export const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
  trend,
}) => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        mb={2}
      >
        <Box>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {title}
          </Typography>

          <Typography variant="h3" component="div" sx={{ fontWeight: 600 }}>
            {value?.toLocaleString() || 0}
          </Typography>
        </Box>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            backgroundColor: `${color}15`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={24} color={color} />
        </Box>
      </Box>
      {trend && (
        <Box display="flex" alignItems="center" gap={1}>
          <Chip
            label={`+${trend} this month`}
            size="small"
            color="success"
            variant="outlined"
          />
        </Box>
      )}
    </CardContent>
  </Card>
);
