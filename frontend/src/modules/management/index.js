import Import from "./pages/Import";
import Settings from "./pages/Settings";

const managementRoutes = [
  {
    path: '/management/data/import',
    element: <Import />,
  },
  {
    path: '/management/settings',
    element: <Settings />,
  },
];

export default managementRoutes;