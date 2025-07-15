import { useEffect } from "react";
import { appUrl } from "../../common/api/config";
import twitchLogo from "../../common/assets/img/platform_logos/twitch.webp";
import { Typography, Card, Button, Grid } from "@mui/material";
import { requestAccessTokenFromTwitch } from "../api/twitch";

const clientId = ""; // Replace with actual client ID

const openTwitchOAuthPopup = () => {
  const redirectUri = `${appUrl}/twitch-oauth-callback`;

  const scope = "user:read:email channel:read:subscriptions";
  const state = "twitch-oauth";
  const oauthUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scope=${encodeURIComponent(scope)}&state=${state}`;

  const width = 500;
  const height = 600;
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;

  window.open(
    oauthUrl,
    "TwitchOAuth",
    `width=${width},height=${height},top=${top},left=${left}`
  );
};

export const LinkTwitchCard = ({ createSource }) => {
  useEffect(() => {
    const handleMessage = async (event) => {
      if (event.origin !== window.location.origin) return; 

      if (event.data?.source === "twitch-oauth" && event.data.code) {
        const authCode = event.data.code;
        const tokenData = await requestAccessTokenFromTwitch(authCode);
        const expiresAt = Date.now() + tokenData.expires_in * 1000;
        const source = {
          account_name: "Twitch Account",
          platform: "twitch",
          access_token: tokenData.access_token,
          refresh_token: tokenData.refresh_token,
          token_expires_at: new Date(expiresAt).toISOString(),
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
    <Grid size={{ xs: 12, md: 6 }}>
      <Card sx={{ p: 3, borderRadius: 2, boxShadow: 2, height: "100%", mt: 1 }}>
        <img
          src={twitchLogo}
          alt="Twitch Logo"
          style={{ height: "70px", objectFit: "contain", marginBottom: 10 }}
        />
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          Twitch
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Link your Twitch account to track streaming analytics, viewer engagement, and monetization metrics.
        </Typography>
        <Button
          variant="outlined"
          sx={{ mt: 3 }}
          onClick={openTwitchOAuthPopup}
          fullWidth
        >
          Link Twitch
        </Button>
      </Card>
    </Grid>
  );
};
