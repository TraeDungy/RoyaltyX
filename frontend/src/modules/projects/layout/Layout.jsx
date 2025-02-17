import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="page-content-wrapper">
      <div className="main-container">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
