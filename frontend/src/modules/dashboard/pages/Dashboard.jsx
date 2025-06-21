import { Grid, Typography, Card, CardContent } from "@mui/material";
import { useAuth } from "../../common/contexts/AuthContext";

function Dashboard() {
  const { name } = useAuth();

  const stats = [
    { label: "Products", value: 14 },
    { label: "Project Members", value: 12 },
    { label: "Connected Accounts", value: 3 },
  ];

  return (
    <>
      <Typography variant="h3" sx={{ mt: 3, mb: 2 }}>
        Hi, {name}!
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid key={index} size={{ xs: 12, md: 4 }}>
            <Card
              variant="outlined"
              sx={{
                height: "100%",
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {stat.label}
                </Typography>
                <Typography variant="h3" fontWeight="bold">
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Dashboard;
