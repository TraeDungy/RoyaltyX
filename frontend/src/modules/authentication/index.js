import { lazy } from "react";
import Loadable from "../common/components/Loadable";

const Login = Loadable(lazy(() => import("./pages/Login/Login")));
const Logout = Loadable(lazy(() => import("./pages/Logout")));
const Register = Loadable(lazy(() => import("./pages/Register/Register")));
const ResetPassword = Loadable(lazy(() => import("./pages/ResetPassword/ResetPassword")));
const ThemeSelection = Loadable(lazy(() => import("./pages/ThemeSelection/ThemeSelection")));

const authRoutes = [
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "reset-password",
    element: <ResetPassword />,
  },
  {
    path: "logout",
    element: <Logout />,
  },
  {
    path: "theme-selection",
    element: <ThemeSelection />,
  },
];

export default authRoutes;
