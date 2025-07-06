import Producers from "./pages/Producers";
import Settings from "./pages/Settings";

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
