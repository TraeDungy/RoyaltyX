import Import from "./pages/Import";
import EditProduct from "./pages/Products/Edit";
import Products from "./pages/Products/Index";
import Settings from "./pages/Settings";

const managementRoutes = [
  {
    path: "/management/data/import",
    element: <Import />,
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
    path: "/management/products/:id/edit",
    element: <EditProduct />,
  },
];

export default managementRoutes;
