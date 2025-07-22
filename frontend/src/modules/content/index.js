import { lazy } from "react";

const Content = lazy(() => import("./pages/Content"));

const contentRoutes = [
  {
    path: "content",
    element: <Content />,
  },
];

export default contentRoutes;
