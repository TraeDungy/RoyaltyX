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
import googleAdsLogo from "../../common/assets/img/platform_logos/google_ads.webp";
import amazonLogo from "../../common/assets/img/platform_logos/amazon.webp";
import { X } from "lucide-react";
import { LinkTikTokCard } from "./LinkTikTokCard";
import { LinkTwitchCard } from "./LinkTwitchCard";

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
          <LinkTwitchCard createSource={createSource} />
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
