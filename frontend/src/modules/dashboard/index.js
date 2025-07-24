import { lazy } from "react";

const Dashboard = lazy(() => import("./pages/Dashboard"));

const dashboardRoutes = [
  {
    path: "",
    element: <Dashboard />,
  },
];

export default dashboardRoutes;
