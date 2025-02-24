import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";

function AppLayout() {
  return (
    <div className="page-content-wrapper">
      <Sidebar />
      <div className="main-content-wrapper">
        <Header />
        <div className="main-container">
          <div className="container px-5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
