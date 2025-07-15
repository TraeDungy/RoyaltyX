import Overview from "./pages/Overview";
import Security from "./pages/Security";
import Membership from "./pages/Membership";

const accountRoutes = [
  {
    path: "account",
    element: <Overview />,
  },
  {
    path: "account/security",
    element: <Security />,
  },
  {
    path: "account/membership",
    element: <Membership />,
  }
];

export default accountRoutes;
