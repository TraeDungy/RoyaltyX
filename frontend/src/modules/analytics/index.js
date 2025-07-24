import Analytics from "./pages/Analytics";
import CompareProducts from "./pages/CompareProducts";

const analyticsRoutes = [
  {
    path: "analytics",
    element: <Analytics />,
  },
  {
    path: "analytics/compare",
    element: <CompareProducts />,
  },
];

export default analyticsRoutes;
