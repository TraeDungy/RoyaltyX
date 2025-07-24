import { lazy } from "react";
import Loadable from "../common/components/Loadable";

const Dashboard = Loadable(lazy(() => import("./pages/Dashboard")));

const dashboardRoutes = [
  {
    path: "",
    element: <Dashboard />,
  },
];

export default dashboardRoutes;
