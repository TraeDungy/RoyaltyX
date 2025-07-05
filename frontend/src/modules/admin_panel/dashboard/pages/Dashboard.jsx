import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Container,
} from "@mui/material";
import { Box2Heart, CurrencyDollar, Person } from "react-bootstrap-icons";

function Dashboard() {
  const [stats] = useState({
    total_number_of_users: 0,
    total_earnings: 0,
    number_of_subscribed_users: 0,
    number_of_standard_subscribed_users: 0,
    number_of_pro_subscribed_users: 0,
  });

  return (
    <Container>
      <Typography variant="h2" sx={{ mt: 4, mb: 3 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card variant="outlined">
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                pb={2}
              >
                <Typography variant="subtitle1" fontWeight="500">
                  Total users
                </Typography>
                <Person className="txt-lighter" />
              </Box>
              <Box display="flex" alignItems="center">
                <Typography variant="h4" component="h2" className="m-0 pe-2">
                  {stats.total_number_of_users}
                </Typography>
              </Box>
              <Box pt={1}>
                <Typography variant="body2">
                  <span className="text-success">+00.0%</span> from last period
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card variant="outlined">
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                pb={2}
              >
                <Typography variant="subtitle1" fontWeight="500">
                  Active users
                </Typography>
                <CurrencyDollar className="txt-lighter" />
              </Box>
              <Box display="flex" alignItems="center">
                <Typography variant="h4" component="h2" className="m-0 pe-2">
                  {stats.total_earnings}
                </Typography>
              </Box>
              <Box pt={1}>
                <Typography variant="body2">
                  <span className="text-success">+00.0%</span> from last period
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card variant="outlined">
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                pb={2}
              >
                <Typography variant="subtitle1" fontWeight="500">
                  Products
                </Typography>
                <Box2Heart className="txt-lighter" />
              </Box>
              <Box display="flex" alignItems="center">
                <Typography variant="h4" component="h2" className="m-0 pe-2">
                  {stats.number_of_subscribed_users}
                </Typography>
              </Box>
              <Box pt={1}>
                <Typography variant="body2">
                  <span className="text-success">+00.0%</span> from last period
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
