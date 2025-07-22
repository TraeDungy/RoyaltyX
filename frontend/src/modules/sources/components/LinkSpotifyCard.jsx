import { useEffect } from "react";
import { appUrl, spotifyClientId } from "../../common/api/config";
import spotifyLogo from "../../common/assets/img/platform_logos/spotify.svg";
import { Typography, Card, Button, Grid, Box } from "@mui/material";
import { requestAccessTokenFromSpotify } from "../api/spotify";

const openSpotifyOAuthPopup = () => {
  const redirectUri = `${appUrl}/spotify-oauth-callback`;
  const scope = "user-read-email";
  const state = "spotify-oauth";
  const oauthUrl = `https://accounts.spotify.com/authorize?client_id=${spotifyClientId}&response_type=code&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scope)}&state=${state}`;

  const width = 500;
  const height = 600;
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;

  window.open(
    oauthUrl,
    "SpotifyOAuth",
    `width=${width},height=${height},top=${top},left=${left}`
  );
};

export const LinkSpotifyCard = ({ createSource }) => {
  useEffect(() => {
    const handleMessage = async (event) => {
      if (event.origin !== window.location.origin) return;

      if (event.data?.source === "spotify-oauth" && event.data.code) {
        const authCode = event.data.code;
        const tokenData = await requestAccessTokenFromSpotify(authCode);
        const expiresAt = Date.now() + tokenData.expires_in * 1000;
        const source = {
          account_name: "Spotify Account",
          platform: "spotify",
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
    <Grid size={{ xs: 12, md: 4 }}>
      <Card sx={{ p: 3, borderRadius: 2, boxShadow: 2, height: "100%", mt: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Box>
            <img
              src={spotifyLogo}
              alt="Spotify Logo"
              style={{ height: "70px", objectFit: "contain", marginBottom: 10 }}
            />
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Spotify
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Link your Spotify for Artists account to analyze streaming data.
            </Typography>
          </Box>
          <Button
            variant="outlined"
            sx={{ mt: 3 }}
            onClick={openSpotifyOAuthPopup}
            fullWidth
          >
            Link Spotify
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};
