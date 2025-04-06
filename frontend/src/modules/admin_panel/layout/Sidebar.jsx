import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  UiChecksGrid,
  Chat,
  People,
  ArrowLeft,
  List,
  Shield,
  Grid1x2,
  Gear,
  BarChart,
  Motherboard,
} from "react-bootstrap-icons";

function Sidebar() {
  const [sidebarActive] = useState(true);
  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 855) {
        const sidebar = document.getElementById("sidebar");
        if (!sidebar.classList.contains("active")) {
          sidebar.classList.toggle("active");
        }
        document.documentElement.style.setProperty("--sidebar-width", "0");
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
    if (sidebar.classList.contains("active")) {
      document.documentElement.style.setProperty("--sidebar-width", "0");
    } else {
      document.documentElement.style.setProperty("--sidebar-width", "236px");
    }
  };

  return (
    <nav id="sidebar" className={!sidebarActive ? "active" : ""}>
      <ul className="list-unstyled py-2">
        <div className="sidebar-link-group">
          <li
            className={`d-flex justify-content-between align-items-center rounded`}
          >
            <Link to="/" className="w-fit px-2 py-1 pointer hover rounded-lg">
              <ArrowLeft className="me-2" />
              <span className="ps-2 medium muted">home</span>
            </Link>
            <div
              className="w-fit pointer hover-lg rounded-lg"
              onClick={toggleSidebar}
            >
              <List className="h5 mb-0" />
            </div>
          </li>
        </div>

        <div className="sidebar-link-group">
          <li
            className={`nav-item px-2 rounded ${currentPage === "/admin/dashboard" ? "active" : ""}`}
          >
            <Link
              to="/admin/dashboard"
              className="nav-link"
              onClick={() => handlePageChange("/admin/dashboard")}
            >
              <UiChecksGrid />
              <span className="ps-3 medium">Dashboard</span>
            </Link>
          </li>
          <li
            className={`nav-item px-2 rounded ${currentPage === "/admin/analytics" ? "active" : ""}`}
          >
            <Link
              to="/admin/analytics"
              className="nav-link"
              onClick={() => handlePageChange("/admin/analytics")}
            >
              <BarChart />
              <span className="ps-3 medium">Analytics</span>
            </Link>
          </li>
          <li
            className={`nav-item px-2 rounded ${currentPage === "/admin/messages" ? "active" : ""}`}
          >
            <Link
              to="/admin/messages"
              className="nav-link"
              onClick={() => handlePageChange("/admin/messages")}
            >
              <Chat />
              <span className="ps-3 medium">Messages</span>
            </Link>
          </li>
        </div>

        <div className="sidebar-link-group">
          <li
            className={`nav-item px-2 rounded ${currentPage === "/admin/role-management" ? "active" : ""}`}
          >
            <Link
              to="/admin/role-management"
              className="nav-link"
              onClick={() => handlePageChange("/admin/role-management")}
            >
              <Shield />
              <span className="ps-3 medium">Role management</span>
            </Link>
          </li>
          <li
            className={`nav-item px-2 rounded ${currentPage === "/admin/users" ? "active" : ""}`}
          >
            <Link
              to="/admin/users"
              className="nav-link"
              onClick={() => handlePageChange("/admin/users")}
            >
              <People />
              <span className="ps-3 medium">Users</span>
            </Link>
          </li>
          <li
            className={`nav-item px-2 rounded ${currentPage === "/admin/system" ? "active" : ""}`}
          >
            <Link
              to="/admin/system"
              className="nav-link"
              onClick={() => handlePageChange("/admin/system")}
            >
              <Motherboard />
              <span className="ps-3 medium">System</span>
            </Link>
          </li>
          <li
            className={`nav-item px-2 rounded ${currentPage === "/admin/layouts" ? "active" : ""}`}
          >
            <Link
              to="/admin/layouts"
              className="nav-link"
              onClick={() => handlePageChange("/admin/layouts")}
            >
              <Grid1x2 />
              <span className="ps-3 medium">Layouts</span>
            </Link>
          </li>
          <li
            className={`nav-item px-2 rounded ${currentPage === "/admin/settings" ? "active" : ""}`}
          >
            <Link
              to="/admin/settings"
              className="nav-link"
              onClick={() => handlePageChange("/admin/settings")}
            >
              <Gear />
              <span className="ps-3 medium">Settings</span>
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default Sidebar;
