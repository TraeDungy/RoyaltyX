import { Grid, Typography, Card, CardContent, Box } from "@mui/material";
import { AtSign, Film, Users } from "lucide-react";
import React from "react";
import { LinkedAccountsSection } from "../components/LinkedAccountsSection";
import { useProducts } from "../../products/api/products";
import { ProductsList } from "../components/ProductsList";
import { useSources } from "../../sources/api/sources";

function Dashboard() {
  const { products, loading } = useProducts();
  const { sources } = useSources();
  const stats = [
    {
      label: "Products",
      value: products?.length || 0,
      icon: <Film size={20} />,
      color: "#FF5722",
    },
    {
      label: "Project Members",
      value: 1,
      icon: <Users size={20} />,
      color: "#3F51B5",
    },
    {
      label: "Linked Accounts",
      value: sources?.length || 0,
      icon: <AtSign size={20} />,
      color: "#4CAF50",
    },
  ];

  return (
    <>
      <Grid container spacing={3} sx={{ mt: 1, mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid key={index} size={{ xs: 12, md: 4 }}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <Typography variant="h6">{stat.label}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: `${stat.color}33`,
                    }}
                  >
                    {React.cloneElement(stat.icon, { color: stat.color })}
                  </Box>
                </div>
                <Typography variant="h2" fontWeight="bold">
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <LinkedAccountsSection sources={sources} loading={loading} />

      <ProductsList products={products} loading={loading} />
    </>
  );
}

export default Dashboard;
