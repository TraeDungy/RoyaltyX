import Analytics from "./pages/Analytics";
import Read from "./pages/ProductUsers/Read";
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

  // Product Users, aka Producers
  {
    path: "products/:id/producers",
    element: <Read />,
  },
];

export default productRoutes;
