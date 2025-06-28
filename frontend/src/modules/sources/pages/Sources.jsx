import { Box, Typography, Card, Button, Grid } from "@mui/material";
import PageHeader from "../../common/components/PageHeader";
import googleAdsLogo from "../../common/assets/img/platform_logos/google_ads.webp";
import amazonLogo from "../../common/assets/img/platform_logos/amazon.webp";
import { LinkYoutubeCard } from "../components/LinkYoutubeCard";
import { useSources } from "../api/sources";
import { SourceItem } from "../components/SourceItem";
import { WifiOff } from "react-bootstrap-icons";

export const Sources = () => {
  const { sources, createSource, loading } = useSources();

  return (
    <Box sx={{ py: 3 }}>
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <PageHeader
            title="Sources"
            description="Manage your data sources and link your platforms of choice."
          />
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {sources.map((source) => (
              <SourceItem key={source.id} source={source} />
            ))}

            {sources.length === 0 && !loading && (
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  height: "60vh",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: 4,
                }}
              >
                <WifiOff size={70} color="var(--color-primary)" />
                <Typography sx={{ color: "text.secondary", mt: 1 }}>
                  No sources connected.
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Grid container spacing={4}>
            <LinkYoutubeCard createSource={createSource} />
            <Grid size={{ xs: 12, md: 12 }}>
              <Card sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
                <Grid container spacing={2}>
                  <Grid
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
                  <Grid>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      Google Ads
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mb: 3 }}
                    >
                      Connect your Google Ads account to track and manage your
                      ad campaigns, performance metrics, and insights all in one
                      place.
                    </Typography>
                    <Grid>
                      <Button
                        variant="outlined"
                        sx={{ mt: 2, display: "block" }}
                        disabled
                      >
                        Link Google Ads
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
              <Card sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
                <Grid container spacing={2}>
                  <Grid
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
                  <Grid>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      Amazon
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mb: 3 }}
                    >
                      Integrate your Amazon account to monitor sales data,
                      product performance, and streamline your e-commerce
                      operations.
                    </Typography>
                    <Grid>
                      <Button
                        variant="outlined"
                        sx={{ mt: 2, display: "block" }}
                        disabled
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
