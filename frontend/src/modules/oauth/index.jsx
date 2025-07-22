import { GoogleOAuthCallback } from "./pages/GoogleOAuthCallback";
import { TikTokOAuthCallback } from "./pages/TikTokOAuthCallback";
import { TwitchOAuthCallback } from "./pages/TwitchOAuthCallback";
import { SquareOAuthCallback } from "./pages/SquareOAuthCallback";

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
    path: "/square-oauth-callback",
    element: <SquareOAuthCallback />,
  },
];

export default oauthRoutes;
