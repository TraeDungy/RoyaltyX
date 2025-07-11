import { Typography, Card, CardContent, Box } from "@mui/material";

const SalesStatsCard = ({ analytics }) => {
  return (
    <div className="col-md-6">
      <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
        Sales Stats
      </Typography>
      <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 2 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>
                NUMBER OF RENTALS
              </Typography>
              <Typography variant="body2" fontWeight="bold" color="primary.main">
                {analytics?.rentals_count?.toLocaleString() || '0'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>
                NUMBER OF PURCHASES
              </Typography>
              <Typography variant="body2" fontWeight="bold" color="primary.main">
                {analytics?.purchases_count?.toLocaleString() || '0'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>
                EARNINGS FROM RENTALS
              </Typography>
              <Typography variant="body2" fontWeight="bold" color="primary.main">
                ${analytics?.rentals_revenue?.toLocaleString() || '0'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>
                EARNINGS FROM PURCHASES
              </Typography>
              <Typography variant="body2" fontWeight="bold" color="primary.main">
                ${analytics?.purchases_revenue?.toLocaleString() || '0'}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesStatsCard;
