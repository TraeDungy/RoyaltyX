import MyProjects from "./pages/MyProjects";
import CreateNewProject from "./pages/CreateNewProject";

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
