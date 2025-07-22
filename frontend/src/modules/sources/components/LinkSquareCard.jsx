import { useEffect } from "react";
import { appUrl, squareApplicationId } from "../../common/api/config";
import squareLogo from "../../common/assets/img/platform_logos/square.svg";
import { Typography, Card, Button, Grid, Box } from "@mui/material";
import { requestAccessTokenFromSquare } from "../api/square";

const openSquareOAuthPopup = () => {
  const redirectUri = `${appUrl}/square-oauth-callback`;
  const scope = "PAYMENTS_READ";
  const state = "square-oauth";
  const oauthUrl = `https://connect.squareup.com/oauth2/authorize?client_id=${squareApplicationId}&scope=${scope}&session=false&state=${state}&redirect_uri=${encodeURIComponent(redirectUri)}`;

  const width = 500;
  const height = 600;
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;

  window.open(
    oauthUrl,
    "SquareOAuth",
    `width=${width},height=${height},top=${top},left=${left}`
  );
};

export const LinkSquareCard = ({ createSource }) => {
  useEffect(() => {
    const handleMessage = async (event) => {
      if (event.origin !== window.location.origin) return;

      if (event.data?.source === "square-oauth" && event.data.code) {
        const authCode = event.data.code;
        const tokenData = await requestAccessTokenFromSquare(authCode);
        const expiresAt = Date.now() + tokenData.expires_in * 1000;
        const source = {
          account_name: "Square Account",
          platform: "square",
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
              src={squareLogo}
              alt="Square Logo"
              style={{ height: "70px", objectFit: "contain", marginBottom: 10 }}
            />
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Square
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Connect your Square account to track sales performance and revenue
              metrics.
            </Typography>
          </Box>
          <Button
            variant="outlined"
            sx={{ mt: 3 }}
            onClick={openSquareOAuthPopup}
            fullWidth
          >
            Link Square
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};
