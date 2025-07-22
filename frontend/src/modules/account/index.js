import { lazy } from "react";

const Overview = lazy(() => import("./pages/Overview"));
const Security = lazy(() => import("./pages/Security"));
const Membership = lazy(() => import("./pages/Membership"));

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
