import { Typography, Card, CardContent, Box, Divider } from "@mui/material";

const GeneralStatsCard = ({ analytics, showProductCount = false }) => {
  return (
    <div className="col-md-6">
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        General stats
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                Impressions
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {analytics?.total_impressions?.toLocaleString() || '0'}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                Revenue From Impressions
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="success.main">
                ${analytics?.total_impression_revenue?.toLocaleString() || '0'}
              </Typography>
            </Box>
            {showProductCount && (
              <>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body1" color="text.secondary">
                    Products
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {analytics?.product_count?.toLocaleString() || '0'}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneralStatsCard;
