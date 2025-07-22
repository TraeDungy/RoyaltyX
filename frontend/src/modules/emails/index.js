import EmailTemplateList from "./pages/EmailTemplateList";
import CreateEmailTemplate from "./pages/CreateEmailTemplate";
import EditEmailTemplate from "./pages/EditEmailTemplate";

const emailRoutes = [
  { path: "email-templates", element: <EmailTemplateList /> },
  { path: "email-templates/new", element: <CreateEmailTemplate /> },
  { path: "email-templates/:id", element: <EditEmailTemplate /> },
];

export { EmailTemplateList, CreateEmailTemplate, EditEmailTemplate };
export default emailRoutes;
