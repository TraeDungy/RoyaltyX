import CreateNewReport from "./pages/CreateNewReport";
import Reports from "./pages/Reports";

const reportRoutes = [
  {
    path: "reports",
    element: <Reports />,
  },
  {
    path: "reports/create",
    element: <CreateNewReport />,
  },
];

export default reportRoutes;
