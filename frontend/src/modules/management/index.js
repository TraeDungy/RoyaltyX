import { lazy } from "react";

const Producers = lazy(() => import("./pages/Producers"));
const Settings = lazy(() => import("./pages/Settings"));

const managementRoutes = [
  {
    path: "/management/settings",
    element: <Settings />,
  },
  {
    path: "/management/producers",
    element: <Producers />,
  },
];

export default managementRoutes;
