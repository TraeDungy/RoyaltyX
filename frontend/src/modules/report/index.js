import Import from "./pages/Import";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

const reportRoutes = [
  {
    path: 'reports',
    element: <Reports />,
  },
  {
    path: '/management/data/import',
    element: <Import />,
  },
  {
    path: '/management/settings',
    element: <Settings />,
  },
];

export default reportRoutes;