import { lazy } from "react";

const MyProjects = lazy(() => import("./pages/MyProjects"));
const CreateNewProject = lazy(() => import("./pages/CreateNewProject"));

const projectRoutes = [
  {
    path: "my-projects",
    element: <MyProjects />,
  },
  {
    path: "projects/create",
    element: <CreateNewProject />,
  },
];

export default projectRoutes;
