import { lazy } from "react";

const HelpDocumentation = lazy(() =>
  import("./help_documentation/pages/HelpDocumentation")
);
const Messaging = lazy(() => import("./help_documentation/pages/Messaging"));
const ProducerUpload = lazy(() =>
  import("./help_documentation/pages/ProducerUpload")
);
const ProductsListView = lazy(() =>
  import("./help_documentation/pages/ProductsListView")
);
const DataUpload = lazy(() => import("./help_documentation/pages/DataUpload"));
const ReportGeneration = lazy(() =>
  import("./help_documentation/pages/ReportGeneration")
);
const Dashboard = lazy(() => import("./dashboard/pages/Dashboard"));
const Support = lazy(() => import("./support/pages/Support"));
const Users = lazy(() => import("./users/pages/Users"));

const adminRoutes = [
  {
    path: "/admin/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/admin/users",
    element: <Users />,
  },
  {
    path: "/admin/support",
    element: <Support />,
  },
  {
    path: "/admin/documentation",
    element: <HelpDocumentation />,
  },
  {
    path: "/admin/documentation/data-upload",
    element: <DataUpload />,
  },
  {
    path: "/admin/documentation/producer-upload",
    element: <ProducerUpload />,
  },
  {
    path: "/admin/documentation/products-list-view",
    element: <ProductsListView />,
  },
  {
    path: "/admin/documentation/messaging",
    element: <Messaging />,
  },
  {
    path: "/admin/documentation/report-generation",
    element: <ReportGeneration />,
  },
];

export default adminRoutes;
