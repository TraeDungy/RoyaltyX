import { Typography, Card, CardContent, Box, Divider } from "@mui/material";

const SalesStatsCard = ({ analytics }) => {
  return (
    <div className="col-md-6">
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Sales stats
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                Number of rentals
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {analytics?.rentals_count?.toLocaleString() || '0'}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                Number of purchases
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {analytics?.purchases_count?.toLocaleString() || '0'}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                Earnings from rentals
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="success.main">
                ${analytics?.rentals_revenue?.toLocaleString() || '0'}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                Earnings from purchases
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="success.main">
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
