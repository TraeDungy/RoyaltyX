import Login from './pages/Login/Login';
import Logout from './pages/Logout';
import ResetPassword from './pages/ResetPassword/ResetPassword';

const authRoutes = [
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'reset-password',
    element: <ResetPassword />,
  },
  {
    path: 'logout',
    element: <Logout />,
  },
];

export default authRoutes;