import { lazy } from "react";

const Login = lazy(() => import("./pages/Login/Login"));
const Logout = lazy(() => import("./pages/Logout"));
const Register = lazy(() => import("./pages/Register/Register"));
const ResetPassword = lazy(() => import("./pages/ResetPassword/ResetPassword"));
const ThemeSelection = lazy(() => import("./pages/ThemeSelection/ThemeSelection"));

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
