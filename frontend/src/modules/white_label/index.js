import WhiteLabelOverview from "./pages/WhiteLabelOverview";
import CostEstimator from "./pages/CostEstimator";

const whiteLabelRoutes = [
  {
    path: "white-label",
    element: <WhiteLabelOverview />,
  },
  {
    path: "white-label/cost-estimator",
    element: <CostEstimator />,
  },
];

export default whiteLabelRoutes;
