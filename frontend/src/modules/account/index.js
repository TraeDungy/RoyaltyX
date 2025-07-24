import Overview from "./pages/Overview";
import Security from "./pages/Security";
import Membership from "./pages/Membership";
import Billing from "./pages/Billing";

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
    path: "account/billing",
    element: <Billing />,
  }
];

export default accountRoutes;
