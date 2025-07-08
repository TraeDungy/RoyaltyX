import { GoogleOAuthCallback } from "./pages/GoogleOAuthCallback";
import { TikTokOAuthCallback } from "./pages/TikTokOAuthCallback";

const oauthRoutes = [
  {
    path: "/google-oauth-callback",
    element: <GoogleOAuthCallback />,
  },
  {
    path: "/tiktok-oauth-callback",
    element: <TikTokOAuthCallback />,
  },
];

export default oauthRoutes;
