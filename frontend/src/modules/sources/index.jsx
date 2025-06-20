import { GoogleOAuthCallback } from "./pages/GoogleOAuthCallback";
import { Sources } from "./pages/Sources";

const sourceRoutes = [
  {
    path: "/sources",
    element: <Sources />,
  },
  {
    path: "/google-oauth-callback",
    element: <GoogleOAuthCallback />,
  },
];

export default sourceRoutes;
