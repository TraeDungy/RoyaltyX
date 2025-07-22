import { EmailTemplateList, CreateEmailTemplate, EditEmailTemplate } from "./index";

const emailRoutes = [
  {
    path: "email-templates",
    element: <EmailTemplateList />,
  },
  {
    path: "email-templates/new",
    element: <CreateEmailTemplate />,
  },
  {
    path: "email-templates/:id",
    element: <EditEmailTemplate />,
  },
];

export default emailRoutes;
