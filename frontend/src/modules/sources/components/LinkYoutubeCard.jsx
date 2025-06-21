import { useEffect } from "react";
import { appUrl } from "../../common/api/config";
import youtubeLogo from "../../common/assets/img/platform_logos/youtube.webp";
import { Typography, Card, Button, Grid } from "@mui/material";
import { requestAccessTokenFromGoogle } from "../api/google";

const openGoogleOAuthPopup = () => {
  const clientId =
    "357908321492-m6umfp34t5gcf7quhr2mqh1vhbsgr3hs.apps.googleusercontent.com";
  const redirectUri = `${appUrl}/google-oauth-callback`;
  const scope = "https://www.googleapis.com/auth/yt-analytics.readonly";
  const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;

  const width = 500;
  const height = 600;
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;

  window.open(
    oauthUrl,
    "GoogleOAuth",
    `width=${width},height=${height},top=${top},left=${left}`
  );
};

export const LinkYoutubeCard = ({createSource}) => {

  useEffect(() => {
    const handleMessage = async (event) => {
      if (event.origin !== window.location.origin) return; // for security

      if (event.data?.source === "google-oauth" && event.data.code) {
        const authCode = event.data.code;
        const googleTokenData = await requestAccessTokenFromGoogle(authCode);
        console.log(googleTokenData.access_token);
        console.log(googleTokenData.refresh_token);
        const source = {
          platform: "youtube",
          access_token: googleTokenData.access_token,
          refresh_token: googleTokenData.refresh_token,
          expires_at: googleTokenData.expires_at,
        };
        try {
          await createSource(source);
        } catch (error) {
          console.error("Error creating data source:", error);
        }

      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
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
              src={youtubeLogo}
              alt="YouTube Logo"
              style={{ height: "70px", objectFit: "contain" }}
            />
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              YouTube
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
              Link your YouTube account to fetch analytics data. This will allow
              you to monitor your channel's performance and gain insights into
              your audience.
            </Typography>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                sx={{ mt: 2, display: "block" }}
                onClick={openGoogleOAuthPopup}
              >
                Link YouTube
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};
