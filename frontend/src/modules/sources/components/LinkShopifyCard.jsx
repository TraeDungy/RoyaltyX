import { useEffect } from "react";
import { appUrl, shopifyApiKey } from "../../common/api/config";
import shopifyLogo from "../../common/assets/img/platform_logos/shopify.svg";
import { Typography, Card, Button, Grid, Box, TextField } from "@mui/material";
import { useState } from "react";
import { requestAccessTokenFromShopify } from "../api/shopify";

const openShopifyOAuthPopup = (shop) => {
  const redirectUri = `${appUrl}/shopify-oauth-callback`;
  const oauthUrl = `https://${shop}/admin/oauth/authorize?client_id=${shopifyApiKey}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=read_orders&state=shopify-oauth`;

  const width = 500;
  const height = 600;
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;

  window.open(
    oauthUrl,
    "ShopifyOAuth",
    `width=${width},height=${height},top=${top},left=${left}`
  );
};

export const LinkShopifyCard = ({ createSource }) => {
  const [shop, setShop] = useState("");

  useEffect(() => {
    const handleMessage = async (event) => {
      if (event.origin !== window.location.origin) return;

      if (event.data?.source === "shopify-oauth" && event.data.code) {
        const authCode = event.data.code;
        const tokenData = await requestAccessTokenFromShopify(event.data.shop, authCode);
        const source = {
          account_name: event.data.shop,
          platform: "shopify",
          access_token: tokenData.access_token,
          channel_id: event.data.shop,
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
              src={shopifyLogo}
              alt="Shopify Logo"
              style={{ height: "70px", objectFit: "contain", marginBottom: 10 }}
            />
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Shopify
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Link your Shopify store to import order data automatically.
            </Typography>
            <TextField
              fullWidth
              size="small"
              label="your-store.myshopify.com"
              value={shop}
              onChange={(e) => setShop(e.target.value)}
              sx={{ mt: 2 }}
            />
          </Box>
          <Button
            variant="outlined"
            sx={{ mt: 3 }}
            onClick={() => openShopifyOAuthPopup(shop)}
            fullWidth
          >
            Link Shopify
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};
