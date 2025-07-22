import Producers from "./pages/Producers";
import Settings from "./pages/Settings";
import Fees from "./pages/Fees";

const managementRoutes = [
  {
    path: "/management/settings",
    element: <Settings />,
  },
  {
    path: "/management/producers",
    element: <Producers />,
  },
  {
    path: "/management/fees",
    element: <Fees />,
  },
];

export default managementRoutes;
