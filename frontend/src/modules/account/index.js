import Overview from "./pages/Overview";
import Security from "./pages/Security";
import Membership from "./pages/Membership";
import Notifications from "./pages/Notifications";

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
  },
  {
    path: "account/notifications",
    element: <Notifications />,
  }
];

export default accountRoutes;
