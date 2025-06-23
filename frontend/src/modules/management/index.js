import DeleteData from "./pages/Data/Delete";
import ImportData from "./pages/Data/Import";
import Producers from "./pages/Producers";
import Settings from "./pages/Settings";

const managementRoutes = [
  {
    path: "/management/data/import",
    element: <ImportData />,
  },
  {
    path: "/management/data/:file_id/delete",
    element: <DeleteData />,
  },
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
