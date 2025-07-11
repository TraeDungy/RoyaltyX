import { Typography, Card, CardContent, Box } from "@mui/material";

const GeneralStatsCard = ({ analytics, showProductCount = false }) => {
  return (
    <div className="col-md-6">
      <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
        General Stats
      </Typography>
      <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 2 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>
                IMPRESSIONS
              </Typography>
              <Typography variant="body2" fontWeight="bold" color="primary.main">
                {analytics?.total_impressions?.toLocaleString() || '0'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>
                REVENUE FROM IMPRESSIONS
              </Typography>
              <Typography variant="body2" fontWeight="bold" color="primary.main">
                ${analytics?.total_impression_revenue?.toLocaleString() || '0'}
              </Typography>
            </Box>
            {showProductCount && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>
                  PRODUCTS
                </Typography>
                <Typography variant="body2" fontWeight="bold" color="primary.main">
                  {analytics?.product_count?.toLocaleString() || '0'}
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneralStatsCard;
