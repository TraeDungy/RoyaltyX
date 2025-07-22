import { GoogleOAuthCallback } from "./pages/GoogleOAuthCallback";
import { TikTokOAuthCallback } from "./pages/TikTokOAuthCallback";
import { TwitchOAuthCallback } from "./pages/TwitchOAuthCallback";
import { SpotifyOAuthCallback } from "./pages/SpotifyOAuthCallback";

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
    path: "/spotify-oauth-callback",
    element: <SpotifyOAuthCallback />,
  },
];

export default oauthRoutes;
