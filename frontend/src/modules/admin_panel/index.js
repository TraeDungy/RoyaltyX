import HelpDocumentation from "./help_documentation/pages/HelpDocumentation";
import Messaging from "./help_documentation/pages/Messaging";
import ProducerUpload from "./help_documentation/pages/ProducerUpload";
import ProductsListView from "./help_documentation/pages/ProductsListView";
import DataUpload from "./help_documentation/pages/DataUpload";
import ReportGeneration from "./help_documentation/pages/ReportGeneration";
import Dashboard from "./dashboard/pages/Dashboard";
import Support from "./support/pages/Support";
import Users from "./users/pages/Users";
import EmailTemplates from "./email_templates/pages/EmailTemplates";
import CreateEmailTemplate from "./email_templates/pages/CreateEmailTemplate";
import EditEmailTemplate from "./email_templates/pages/EditEmailTemplate";

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
    path: "/admin/email-templates",
    element: <EmailTemplates />,
  },
  {
    path: "/admin/email-templates/create",
    element: <CreateEmailTemplate />,
  },
  {
    path: "/admin/email-templates/:id/edit",
    element: <EditEmailTemplate />,
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
