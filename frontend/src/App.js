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
import dashboardRoutes from './modules/dashboard';
import projectRoutes from './modules/projects';
import Layout from './modules/projects/layout/Layout';
import memberRoutes from './modules/members';
import reportRoutes from './modules/report';
import accountRoutes from './modules/account';
import contentRoutes from './modules/content';
import analyticsRoutes from './modules/analytics';
import inboxRoutes from './modules/inbox';

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
        children: [
          ...dashboardRoutes,
          ...analyticsRoutes,
          ...memberRoutes,
          ...reportRoutes,
          ...accountRoutes,
          ...contentRoutes,
          ...inboxRoutes
        ],
      },
      {
        path: '/',
        element: <Layout />,
        children: [
          ...projectRoutes,
        ],
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