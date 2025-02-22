import Analytics from "./pages/Analytics";
import View from "./pages/View";

const productRoutes = [
  {
    path: "products/:id",
    element: <View />,
  },
  {
    path: "products/:id/analytics",
    element: <Analytics />,
  },
];

export default productRoutes;
