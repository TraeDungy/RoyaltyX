import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Settings,
  Gauge,
  Folder,
  FileText,
  User,
  HelpCircle,
  Database,
  AlignLeft,
  Package2,
} from "lucide-react";
import { getUserInfo } from "../../../account/api/user";
import { getMyProjects, switchProject } from "../../../projects/api/project";
import ProductsList from "./ProductsList";
import { useProject } from "../../contexts/ProjectContext";
import { useAuth } from "../../contexts/AuthContext";
import { LayoutDashboard, Users } from "lucide-react";

function Sidebar() {
  const [sidebarActive] = useState(true);
  const [currentPage, setCurrentPage] = useState(window.location.pathname);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [myProjects, setMyProjects] = useState([]);
  const { project } = useProject();
  const { email } = useAuth();
  const projectUser = project?.users?.find(
    (user) => user.user_details.email === email
  );

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

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const fetchedUserInfo = await getUserInfo();
        setUserInfo(fetchedUserInfo);
      } catch (error) {
        console.error("Error fetching :", error);
      }

      try {
        const fetchedMyProjects = await getMyProjects();
        setMyProjects(fetchedMyProjects);
      } catch (error) {
        console.error("Error fetching :", error);
      }
    };

    fetchUserInfo();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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

  const handleSwitchProject = async (project_id) => {
    try {
      await switchProject(project_id);
      window.location.reload();
    } catch (error) {
      console.error("Error fetching :", error);
    }
  };

  return (
    <>
      <nav id="sidebar" className={!sidebarActive ? "active" : ""}>
        <ul className="list-unstyled">
          <div className="sidebar-link-group">
            <div className="d-flex justify-content-between align-items-center">
              <div className="dropdown show">
                <div
                  className="dropdown-toggle rounded-lg p-1 pe-2 bgc-light-contrast hover-lg d-flex align-items-center"
                  type="button"
                  id="projectsDropdown"
                  onClick={toggleDropdown}
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen ? "true" : "false"}
                >
                  <div className="d-flex justify-content-center align-items-center px-1">
                    <Folder className="me-2" size={18} color="var(--color-text-lighter)" />
                    <span className="fw-500">{userInfo?.project?.name}</span>
                    <p className="m-0 pe-2">
                      {userInfo?.currently_selected_project?.name}
                    </p>
                  </div>
                  <ChevronDown className="ms-auto" size={18} />
                </div>
                <div
                  className={
                    "dropdown-menu border-0 shadow pt-2 pb-3" +
                    (isDropdownOpen ? " show" : "")
                  }
                  aria-labelledby="projectsDropdown"
                  style={{ width: 230 }}
                >
                  {myProjects.map((myProject) => (
                    <span
                      className="dropdown-item py-2 pointer"
                      key={myProject.id}
                      onClick={() => {
                        handleSwitchProject(myProject.id);
                      }}
                    >
                      {myProject?.name}
                    </span>
                  ))}
                  <hr />
                  <Link
                    to="/my-projects"
                    className="dropdown-item medium txt-primary pointer"
                  >
                    View all
                  </Link>
                </div>
              </div>

              <span
                className={`d-flex justify-content-end align-items-center rounded`}
              >
                <div
                  className="w-fit pointer rounded-lg"
                  onClick={toggleSidebar}
                >
                  <AlignLeft size={18} />
                </div>
              </span>
            </div>
          </div>

          {projectUser?.role === "owner" && (
            <div className="sidebar-link-group">
              <span className="txt-lighter small ps-2">MANAGEMENT</span>
              <li
                className={`nav-item px-2 rounded my-1 ${currentPage === "/sources" ? "active" : ""}`}
              >
                <Link
                  to="/sources"
                  className="nav-link"
                  onClick={() => handlePageChange("/sources")}
                >
                  <Database size={18} color="var(--color-text-lighter)" />
                  <span className="ps-4 medium">Sources</span>
                </Link>
              </li>
              <li
                className={`nav-item px-2 rounded my-1 ${currentPage === "/management/data/import" ? "active" : ""}`}
              >
                <Link
                  to="/management/data/import"
                  className="nav-link"
                  onClick={() => handlePageChange("/management/data/import")}
                >
                  <FileText size={18} color="var(--color-text-lighter)" />
                  <span className="ps-4 medium">Manual import</span>
                </Link>
              </li>
              <li
                className={`nav-item px-2 rounded my-1 ${currentPage === "/management/settings" ? "active" : ""}`}
              >
                <Link
                  to="/management/settings"
                  className="nav-link"
                  onClick={() => handlePageChange("/management/settings")}
                >
                  <Settings size={18} color="var(--color-text-lighter)" />
                  <span className="ps-4 medium">Project Settings</span>
                </Link>
              </li>
              <li
                className={`nav-item px-2 rounded my-1 ${currentPage === "/management/products" ? "active" : ""}`}
              >
                <Link
                  to="/management/products"
                  className="nav-link"
                  onClick={() => handlePageChange("/management/products")}
                >
                  <Package2 size={18} color="var(--color-text-lighter)" />
                  <span className="ps-4 medium">Products</span>
                </Link>
              </li>
              <li
                className={`nav-item px-2 rounded my-1 ${currentPage === "/management/producers" ? "active" : ""}`}
              >
                <Link
                  to="/management/producers"
                  className="nav-link"
                  onClick={() => handlePageChange("/management/producers")}
                >
                  <User size={18} color="var(--color-text-lighter)" />
                  <span className="ps-4 medium">Producers</span>
                </Link>
              </li>
              <li
                className={`nav-item px-2 rounded my-1 ${currentPage === "/documentation" ? "active" : ""}`}
              >
                <Link
                  to="/documentation"
                  className="nav-link"
                  onClick={() => handlePageChange("/documentation")}
                >
                  <HelpCircle size={18} color="var(--color-text-lighter)" />
                  <span className="ps-4 medium">Help Documentation</span>
                </Link>
              </li>
            </div>
          )}

          <div className="sidebar-link-group">
            <span className="txt-lighter small ps-2">PROJECT</span>
            <li
              className={`nav-item px-2 rounded my-1 ${currentPage === "/" ? "active" : ""}`}
            >
              <Link
                to="/"
                className="nav-link"
                onClick={() => handlePageChange("/")}
              >
                <LayoutDashboard size={18} color="var(--color-text-lighter)" />
                <span className="ps-4 medium">Dashboard</span>
              </Link>
            </li>
            <li
              className={`nav-item px-2 rounded my-1 ${currentPage === "/members" ? "active" : ""}`}
            >
              <Link
                to="/members"
                className="nav-link"
                onClick={() => handlePageChange("/members")}
              >
                <Users size={18} color="var(--color-text-lighter)" />

                <span className="ps-4 medium">Members</span>
              </Link>
            </li>
            <li
              className={`nav-item px-2 rounded my-1 ${currentPage === "/analytics" ? "active" : ""}`}
            >
              <Link
                to="/analytics"
                className="nav-link"
                onClick={() => handlePageChange("/analytics")}
              >
                <Gauge size={18} color="var(--color-text-lighter)" />
                <span className="ps-4 medium">Analytics</span>
              </Link>
            </li>
            <li
              className={`nav-item px-2 rounded my-1 ${currentPage === "/reports" ? "active" : ""}`}
            >
              <Link
                to="/reports"
                className="nav-link"
                onClick={() => handlePageChange("/reports")}
              >
                <FileText size={18} color="var(--color-text-lighter)" />
                <span className="ps-4 medium">Reports</span>
              </Link>
            </li>
          </div>

          <ProductsList />
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
