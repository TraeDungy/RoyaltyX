import HelpDocumentation from "./pages/HelpDocumentation";
import Messaging from "./pages/Messaging";
import ProducerUpload from "./pages/ProducerUpload";
import ProductsListView from "./pages/ProductsListView";
import DataUpload from "./pages/DataUpload";
import ReportGeneration from "./pages/ReportGeneration";
import HelpChat from "./pages/HelpChat";

const helpDocumentationRoutes = [
  {
    path: "documentation",
    element: <HelpDocumentation />,
  },
  {
    path: "documentation/data-upload",
    element: <DataUpload />,
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
  {
    path: "documentation/report-generation",
    element: <ReportGeneration />,
  },
  {
    path: "documentation/chat",
    element: <HelpChat />,
  },
];

export default helpDocumentationRoutes;
