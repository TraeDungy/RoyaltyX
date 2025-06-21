import { Box, Typography, Card, Button, Grid } from "@mui/material";
import PageHeader from "../../common/components/PageHeader";
import googleAdsLogo from "../../common/assets/img/platform_logos/google_ads.webp";
import amazonLogo from "../../common/assets/img/platform_logos/amazon.webp";
import { LinkYoutubeCard } from "../components/LinkYoutubeCard";
import { useEffect, useState } from "react";
import { getDataSources } from "../api/sources";
import { SourceItem } from "../components/SourceItem";

export const Sources = () => {
  const [sources, setSources] = useState([]);

  useEffect(() => {
    const fetchSources = async () => {
      try {
        const response = await getDataSources();
        setSources(response);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchSources();
  }, []);

  console.log(sources);

  return (
    <Box sx={{ py: 3 }}>
      <PageHeader
        title="Sources"
        description="Manage your data sources and link your platforms of choice."
      />

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {sources.length > 0 &&
              sources.map((source) => (
                <SourceItem key={source.id} source={source} />
              ))}
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <LinkYoutubeCard />
            <Grid size={{ xs: 12, md: 12 }}>
              <Card sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={googleAdsLogo}
                      alt="Google Ads Logo"
                      style={{ height: "70px", objectFit: "contain" }}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      Google Ads
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mb: 3 }}
                    >
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Nam laborum a veniam velit iure.
                    </Typography>
                    <Grid item xs={12}>
                      <Button
                        variant="outlined"
                        sx={{ mt: 2, display: "block" }}
                      >
                        Link Google Ads
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
              <Card sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={amazonLogo}
                      alt="Amazon Logo"
                      style={{ height: "70px", objectFit: "contain" }}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      Amazon
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mb: 3 }}
                    >
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Nam laborum a veniam velit iure.
                    </Typography>
                    <Grid item xs={12}>
                      <Button
                        variant="outlined"
                        sx={{ mt: 2, display: "block" }}
                      >
                        Link Amazon
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
