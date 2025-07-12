import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Grid,
  Typography,
  Card,
  Button,
} from "@mui/material";
import { LinkYoutubeCard } from "./LinkYoutubeCard";
import { LinkTikTokCard } from "./LinkTikTokCard";
import googleAdsLogo from "../../common/assets/img/platform_logos/google_ads.webp";
import amazonLogo from "../../common/assets/img/platform_logos/amazon.webp";
import instagramLogo from "../../common/assets/img/platform_logos/instagram.webp";
import twitchLogo from "../../common/assets/img/platform_logos/twitch.webp";
import patreonLogo from "../../common/assets/img/platform_logos/patreon.webp";
import appleAppStoreLogo from "../../common/assets/img/platform_logos/apple_app_store.png";
import googlePlayLogo from "../../common/assets/img/platform_logos/google_play.svg";
import spotifyLogo from "../../common/assets/img/platform_logos/spotify.svg";
import audibleLogo from "../../common/assets/img/platform_logos/audible.svg";
import temuLogo from "../../common/assets/img/platform_logos/temu.svg";
import { ReactComponent as FacebookLogo } from "../../common/assets/img/platform_logos/facebook.svg";
import { X } from "lucide-react";

export const AddSourceModal = ({ open, onClose, createSource }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 2,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Add new source
        </Typography>
        <IconButton onClick={onClose}>
          <X size={25} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pb: 3 }}>
        <Grid container spacing={3}>
          <LinkYoutubeCard createSource={createSource} />

          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: 2,
                height: "100%",
                mt: 1,
              }}
            >
              <img
                src={googleAdsLogo}
                alt="Google Ads Logo"
                style={{
                  height: "70px",
                  objectFit: "contain",
                  marginBottom: 10,
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Google Ads
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Connect your Google Ads account to track and manage your ad
                campaigns, performance metrics, and insights all in one place.
              </Typography>
              <Button variant="outlined" sx={{ mt: 3 }} disabled fullWidth>
                Link Google Ads
              </Button>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: 2,
                height: "100%",
                mt: 1,
              }}
            >
              <img
                src={amazonLogo}
                alt="Amazon Logo"
                style={{
                  height: "70px",
                  objectFit: "contain",
                  marginBottom: 10,
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Amazon
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Integrate your Amazon account to monitor sales data, product
                performance, and streamline your e-commerce operations.
              </Typography>
              <Button variant="outlined" sx={{ mt: 3 }} disabled fullWidth>
                Link Amazon
              </Button>
            </Card>
          </Grid>
          <LinkTikTokCard createSource={createSource} />

          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: 2,
                height: "100%",
                mt: 1,
              }}
            >
              <img
                src={instagramLogo}
                alt="Instagram Logo"
                style={{
                  height: "70px",
                  objectFit: "contain",
                  marginBottom: 10,
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Instagram
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Connect your Instagram account to analyze post performance, 
                audience engagement, and optimize your social media strategy.
              </Typography>
              <Button variant="outlined" sx={{ mt: 3 }} disabled fullWidth>
                Link Instagram
              </Button>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: 2,
                height: "100%",
                mt: 1,
              }}
            >
              <img
                src={twitchLogo}
                alt="Twitch Logo"
                style={{
                  height: "70px",
                  objectFit: "contain",
                  marginBottom: 10,
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Twitch
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Link your Twitch account to track streaming analytics, 
                viewer engagement, and monetization metrics.
              </Typography>
              <Button variant="outlined" sx={{ mt: 3 }} disabled fullWidth>
                Link Twitch
              </Button>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: 2,
                height: "100%",
                mt: 1,
              }}
            >
              <img
                src={patreonLogo}
                alt="Patreon Logo"
                style={{
                  height: "70px",
                  objectFit: "contain",
                  marginBottom: 10,
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Patreon
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Connect your Patreon account to monitor subscription revenue, 
                patron growth, and content performance analytics.
              </Typography>
              <Button variant="outlined" sx={{ mt: 3 }} disabled fullWidth>
                Link Patreon
              </Button>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: 2,
                height: "100%",
                mt: 1,
              }}
            >
              <FacebookLogo
                style={{
                  height: "70px",
                  width: "auto",
                  marginBottom: 10,
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Facebook
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Integrate your Facebook account to analyze page insights, 
                post engagement, and audience demographics.
              </Typography>
              <Button variant="outlined" sx={{ mt: 3 }} disabled fullWidth>
                Link Facebook
              </Button>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: 2,
                height: "100%",
                mt: 1,
              }}
            >
              <img
                src={appleAppStoreLogo}
                alt="Apple App Store Logo"
                style={{
                  height: "70px",
                  objectFit: "contain",
                  marginBottom: 10,
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Apple App Store
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Connect your Apple App Store account to track app downloads, 
                revenue, and user reviews across iOS devices.
              </Typography>
              <Button variant="outlined" sx={{ mt: 3 }} disabled fullWidth>
                Link Apple App Store
              </Button>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: 2,
                height: "100%",
                mt: 1,
              }}
            >
              <img
                src={googlePlayLogo}
                alt="Google Play Logo"
                style={{
                  height: "70px",
                  objectFit: "contain",
                  marginBottom: 10,
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Google Play
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Link your Google Play Console to monitor app performance, 
                downloads, and revenue from Android users.
              </Typography>
              <Button variant="outlined" sx={{ mt: 3 }} disabled fullWidth>
                Link Google Play
              </Button>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: 2,
                height: "100%",
                mt: 1,
              }}
            >
              <img
                src={audibleLogo}
                alt="Audible Logo"
                style={{
                  height: "70px",
                  objectFit: "contain",
                  marginBottom: 10,
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Audible
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Connect your Audible account to track audiobook sales, 
                listener engagement, and royalty earnings.
              </Typography>
              <Button variant="outlined" sx={{ mt: 3 }} disabled fullWidth>
                Link Audible
              </Button>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: 2,
                height: "100%",
                mt: 1,
              }}
            >
              <img
                src={spotifyLogo}
                alt="Spotify Logo"
                style={{
                  height: "70px",
                  objectFit: "contain",
                  marginBottom: 10,
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Spotify
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Link your Spotify for Artists account to analyze streaming data, 
                listener demographics, and track performance.
              </Typography>
              <Button variant="outlined" sx={{ mt: 3 }} disabled fullWidth>
                Link Spotify
              </Button>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: 2,
                height: "100%",
                mt: 1,
              }}
            >
              <img
                src={temuLogo}
                alt="Temu Logo"
                style={{
                  height: "70px",
                  objectFit: "contain",
                  marginBottom: 10,
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Temu
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Connect your Temu seller account to monitor product sales, 
                customer reviews, and marketplace performance.
              </Typography>
              <Button variant="outlined" sx={{ mt: 3 }} disabled fullWidth>
                Link Temu
              </Button>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
