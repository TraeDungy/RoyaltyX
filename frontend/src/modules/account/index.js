import Overview from "./pages/Overview";
import Security from "./pages/Security";
import Membership from "./pages/Membership";
import PaymentHistory from "./pages/PaymentHistory";

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
    path: "account/payment-history",
    element: <PaymentHistory />,
  },
];

export default accountRoutes;
