import Analytics from "./pages/Analytics";
import EditProduct from "./pages/Products/Edit";
import Products from "./pages/Products/Index";
import Details from "./pages/Details";

const productRoutes = [
  {
    path: "products",
    element: <Products />,
  },
  {
    path: "products/:id",
    element: <Details />,
  },
  {
    path: "products/:id/analytics",
    element: <Analytics />,
  },
  {
    path: "products/:id/edit",
    element: <EditProduct />,
  },
];

export default productRoutes;
