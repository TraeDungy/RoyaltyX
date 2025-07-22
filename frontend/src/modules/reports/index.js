import CreateNewReport from "./pages/CreateNewReport";
import CreateNewReportTemplate from "./pages/ReportTemplate/CreateNewReportTemplate";
import DeleteReportTemplate from "./pages/ReportTemplate/DeleteReportTemplate";
import EditReportTemplate from "./pages/ReportTemplate/EditReportTemplate";
import Reports from "./pages/Reports";
import ReportTemplates from "./pages/ReportTemplate/ReportTemplates";
import TemplateBuilder from "./templateBuilder";

const reportRoutes = [
  {
    path: "reports",
    element: <Reports />,
  },
  {
    path: "reports/create",
    element: <CreateNewReport />,
  },
  {
    path: "report-templates/",
    element: <ReportTemplates />,
  },
  {
    path: "report-templates/create",
    element: <CreateNewReportTemplate />,
  },
  {
    path: "report-templates/:id/edit",
    element: <EditReportTemplate />,
  },
  {
    path: "report-templates/:id/delete",
    element: <DeleteReportTemplate />,
  },
  {
    path: "report-template-builder",
    element: <TemplateBuilder />,
  },
];

export default reportRoutes;
