import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";

function AppLayout() {
  const location = useLocation();

  return (
    <div className="page-content-wrapper">
      <Sidebar />
      <div className="main-content-wrapper">
        <Header />
        <div className="main-container">
          <div
            className={`"container" ${!location.pathname.startsWith("/inbox") ? "px-5" : ""}`}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
