import { lazy } from "react";

const GoogleOAuthCallback = lazy(() => import("./pages/GoogleOAuthCallback"));
const TikTokOAuthCallback = lazy(() => import("./pages/TikTokOAuthCallback"));
const TwitchOAuthCallback = lazy(() => import("./pages/TwitchOAuthCallback"));

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
];

export default oauthRoutes;
