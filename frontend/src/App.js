import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import AppLayout from "./modules/common/layouts/AppLayout";
import ScrollToTop from "./modules/common/components/ScrollToTop";
import PageNotFound from "./modules/common/pages/PageNotFound";
import authRoutes from "./modules/authentication";
import adminRoutes from "./modules/admin_panel";
import { AuthProvider, useAuth } from "./modules/common/contexts/AuthContext";
import AdminLayout from "./modules/admin_panel/shared/layout/AdminLayout";
import { ThemeProvider } from "./modules/common/contexts/ThemeContext";
import dashboardRoutes from "./modules/dashboard";
import projectRoutes from "./modules/projects";
import Layout from "./modules/projects/layout/Layout";
import memberRoutes from "./modules/members";
import reportRoutes from "./modules/reports";
import accountRoutes from "./modules/account";
import contentRoutes from "./modules/content";
import analyticsRoutes from "./modules/analytics";
import supportRoutes from "./modules/support/routes";
import managementRoutes from "./modules/management";
import productRoutes from "./modules/products";
import whiteLabelRoutes from "./modules/whiteLabel/routes";
import { ProjectProvider } from "./modules/common/contexts/ProjectContext";
import { SettingsProvider } from "./modules/common/contexts/SettingsContext";
import { MUIThemeWrapper } from "./modules/global/components/MUIThemeWrapper";
import sourceRoutes from "./modules/sources";
import oauthRoutes from "./modules/oauth";

const PrivateRoutes = () => {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

const renderRoutes = (routes) => {
  return routes.map((route, index) => {
    if (route.children) {
      return (
        <Route key={index} path={route.path} element={route.element}>
          {renderRoutes(route.children)}
        </Route>
      );
    } else {
      return (
        <Route
          key={index}
          path={route.path}
          element={route.element}
          index={route.index}
        />
      );
    }
  });
};

function App() {
  return (
    <Router>
      <SettingsProvider>
        <AuthProvider>
          <ThemeProvider>
            <MUIThemeWrapper>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<PrivateRoutes />}>
                  <Route
                    path="/"
                    element={
                      <ProjectProvider>
                          <AppLayout />
                      </ProjectProvider>
                    }
                  >
                    {renderRoutes([
                      ...dashboardRoutes,
                      ...analyticsRoutes,
                      ...memberRoutes,
                      ...reportRoutes,
                      ...accountRoutes,
                      ...contentRoutes,
                      ...managementRoutes,
                      ...sourceRoutes,
                      ...productRoutes,
                      ...supportRoutes,
                      ...whiteLabelRoutes,
                    ])}
                  </Route>

                  <Route path="/" element={<Layout />}>
                    {renderRoutes([...projectRoutes])}
                  </Route>
                </Route>

                <Route path="/admin" element={<PrivateRoutes />}>
                  <Route path="/admin" element={<AdminLayout />}>
                    {renderRoutes([...adminRoutes])}
                  </Route>
                </Route>

                {renderRoutes([...authRoutes, ...oauthRoutes])}

                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </MUIThemeWrapper>
          </ThemeProvider>
        </AuthProvider>
      </SettingsProvider>
    </Router>
  );
}

export default App;
