import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import "./AdminPanel.css";

function AdminLayout() {
  return (
    <div className="page-content-wrapper">
      <Sidebar />
      <div className="main-admin-content-wrapper">
        <div className="main-admin-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
