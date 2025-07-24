import Overview from "./pages/Overview";
import Security from "./pages/Security";
import Membership from "./pages/Membership";
import BillingHistory from "./pages/BillingHistory";
import PaymentMethods from "./pages/PaymentMethods";

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
    element: <BillingHistory />,
  },
  {
    path: "account/payment-methods",
    element: <PaymentMethods />,
  }
];

export default accountRoutes;
