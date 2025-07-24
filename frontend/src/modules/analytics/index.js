import { lazy } from "react";

const Analytics = lazy(() => import("./pages/Analytics"));

const analyticsRoutes = [
  {
    path: "analytics",
    element: <Analytics />,
  },
];

export default analyticsRoutes;
