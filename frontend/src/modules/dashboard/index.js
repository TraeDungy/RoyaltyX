import Dashboard from "./pages/Dashboard";
import DashboardTemplateBuilder from "./pages/DashboardTemplateBuilder";
import TemplateSelection from "./pages/TemplateSelection";

const dashboardRoutes = [
  {
    path: "",
    element: <Dashboard />,
  },
  {
    path: "customize",
    element: <DashboardTemplateBuilder />,
  },
  {
    path: "template-selection",
    element: <TemplateSelection />,
  },
];

export default dashboardRoutes;
