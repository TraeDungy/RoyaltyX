import { GoogleOAuthCallback } from "./pages/GoogleOAuthCallback";
import { TikTokOAuthCallback } from "./pages/TikTokOAuthCallback";
import { TwitchOAuthCallback } from "./pages/TwitchOAuthCallback";
import { ShopifyOAuthCallback } from "./pages/ShopifyOAuthCallback";

const oauthRoutes = [
  {
    path: "/google-oauth-callback",
    element: <GoogleOAuthCallback />,
  },
  {
    path: "/tiktok-oauth-callback",
    element: <TikTokOAuthCallback />,
  },
  {
    path: "/twitch-oauth-callback",
    element: <TwitchOAuthCallback />,
  },
  {
    path: "/shopify-oauth-callback",
    element: <ShopifyOAuthCallback />,
  },
];

export default oauthRoutes;
