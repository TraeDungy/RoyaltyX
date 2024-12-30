import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import AppLayout from "./modules/common/layouts/AppLayout";
import ScrollToTop from './modules/common/components/ScrollToTop';
import PageNotFound from './modules/common/pages/PageNotFound';
import authRoutes from './modules/authentication';
import adminRoutes from './modules/admin_panel';
import { AuthProvider, useAuth } from './modules/common/contexts/AuthContext';
import AdminLayout from './modules/admin_panel/layout/AdminLayout';
import React from 'react';
import { ThemeProvider } from './modules/common/contexts/ThemeContext';
import homeRoutes from './modules/home';

const PrivateRoutes = () => {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

const routes = [
  {
    path: '/',
    element: <PrivateRoutes />,
    children: [
      {
        path: '/',
        element: <AppLayout />,
        children: [...homeRoutes],
      },
    ],
  },
  ...authRoutes,
  {
    path: '/admin',
    element: <PrivateRoutes />,
    children: [
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          ...adminRoutes,
        ],
      },
    ],
  },
  ...authRoutes,
  {
    path: '*',
    element: <PageNotFound />,
  },
];


const renderRoutes = (routes) => {
  return routes.map((route, index) => {
    if (route.children) {
      return (
        <Route key={index} path={route.path} element={route.element}>
          {renderRoutes(route.children)}
        </Route>
      );
    } else {
      return <Route key={index} path={route.path} element={route.element} index={route.index} />;
    }
  });
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <ScrollToTop />
          <Routes>{renderRoutes(routes)}</Routes>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;