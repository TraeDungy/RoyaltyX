import Login from "./pages/Login/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register/Register";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ThemeSelection from "./pages/ThemeSelection/ThemeSelection";

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
