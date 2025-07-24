import { useEffect } from "react";
import { appUrl, vimeoClientId } from "../../common/api/config";
import { Typography, Card, Button, Grid, Box } from "@mui/material";
import vimeoLogo from "../../common/assets/img/platform_logos/vimeo.svg";
import { requestAccessTokenFromVimeo } from "../api/vimeo";

const openVimeoOAuthPopup = () => {
  const redirectUri = `${appUrl}/vimeo-oauth-callback`;
  const scope = "public";
  const oauthUrl = `https://api.vimeo.com/oauth/authorize?response_type=code&client_id=${vimeoClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;

  const width = 500;
  const height = 600;
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;

  window.open(
    oauthUrl,
    "VimeoOAuth",
    `width=${width},height=${height},top=${top},left=${left}`
  );
};

export const LinkVimeoCard = ({ createSource }) => {
  useEffect(() => {
    const handleMessage = async (event) => {
      if (event.origin !== window.location.origin) return;

      if (event.data?.source === "vimeo-oauth" && event.data.code) {
        const authCode = event.data.code;
        const tokenData = await requestAccessTokenFromVimeo(authCode);
        const expiresAt = Date.now() + tokenData.expires_in * 1000;
        const source = {
          account_name: "Vimeo Account",
          platform: "vimeo",
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
    <Grid item xs={12} md={4}>
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
              src={vimeoLogo}
              alt="Vimeo Logo"
              style={{ height: "70px", objectFit: "contain", marginBottom: 10 }}
            />
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Vimeo
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Connect your Vimeo account to track video performance and audience engagement.
            </Typography>
          </Box>
          <Button
            variant="outlined"
            sx={{ mt: 3 }}
            onClick={openVimeoOAuthPopup}
            fullWidth
          >
            Link Vimeo
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};
