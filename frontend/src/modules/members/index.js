import { lazy } from "react";

const Members = lazy(() => import("./pages/Members"));

const memberRoutes = [
  {
    path: "members",
    element: <Members />,
  },
];

export default memberRoutes;
