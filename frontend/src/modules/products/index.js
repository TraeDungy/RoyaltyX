import { lazy } from "react";

const Analytics = lazy(() => import("./pages/Analytics"));
const EditProduct = lazy(() => import("./pages/Products/Edit"));
const Products = lazy(() => import("./pages/Products/Index"));
const Details = lazy(() => import("./pages/Details"));

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
