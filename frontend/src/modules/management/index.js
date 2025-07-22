import Producers from "./pages/Producers";
import Settings from "./pages/Settings";
import WhiteLabelPage from "./pages/WhiteLabelPage";

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
    path: "/management/white-label",
    element: <WhiteLabelPage />,
  },
];

export default managementRoutes;
