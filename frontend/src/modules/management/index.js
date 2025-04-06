import DeleteData from "./pages/Data/Delete";
import ImportData from "./pages/Data/Import";
import Producers from "./pages/Producers";
import EditProduct from "./pages/Products/Edit";
import Products from "./pages/Products/Index";
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
    path: "/management/products",
    element: <Products />,
  },
  {
    path: "/management/producers",
    element: <Producers />,
  },
  {
    path: "/management/products/:id/edit",
    element: <EditProduct />,
  },
];

export default managementRoutes;
