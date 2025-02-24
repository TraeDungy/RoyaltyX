import Dashboard from "./pages/Dashboard";
import AddUser from "./pages/Users/AddUser";
import Users from "./pages/Users/Users";

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
    path: "/admin/users/add",
    element: <AddUser />,
  },
];

export default adminRoutes;
