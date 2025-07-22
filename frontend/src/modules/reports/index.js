import { lazy } from "react";

const CreateNewReport = lazy(() => import("./pages/CreateNewReport"));
const CreateNewReportTemplate = lazy(() =>
  import("./pages/ReportTemplate/CreateNewReportTemplate")
);
const DeleteReportTemplate = lazy(() =>
  import("./pages/ReportTemplate/DeleteReportTemplate")
);
const EditReportTemplate = lazy(() =>
  import("./pages/ReportTemplate/EditReportTemplate")
);
const Reports = lazy(() => import("./pages/Reports"));
const ReportTemplates = lazy(() =>
  import("./pages/ReportTemplate/ReportTemplates")
);

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
];

export default reportRoutes;
