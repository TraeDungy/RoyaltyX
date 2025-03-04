import HelpDocumentation from "./pages/HelpDocumentation";
import Messaging from "./pages/Messaging";
import ProducerUpload from "./pages/ProducerUpload";
import ProductsListView from "./pages/ProductsListView";
import ReportUpload from "./pages/ReportUpload";

const helpDocumentationRoutes = [
  {
    path: "documentation",
    element: <HelpDocumentation />,
  },
  {
    path: "documentation/report-upload",
    element: <ReportUpload />,
  },
  {
    path: "documentation/producer-upload",
    element: <ProducerUpload />,
  },
  {
    path: "documentation/products-list-view",
    element: <ProductsListView />,
  },
  {
    path: "documentation/messaging",
    element: <Messaging />,
  },
];

export default helpDocumentationRoutes;
