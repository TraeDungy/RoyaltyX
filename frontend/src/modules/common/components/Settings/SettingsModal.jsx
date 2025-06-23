import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import GeneralSettings from "./GeneralSettings";
import ThemeSettings from "./ThemeSettings";
import DangerZone from "./DangerZone";
import ViewSettings from "./ViewSettings";
import { Settings, Palette, LayoutGrid, CircleAlert } from "lucide-react";

function SettingsModal({ showSettingsModal, setShowSettingsModal }) {
  const [selectedTab, setSelectedTab] = useState("general");

  const handleClose = () => setShowSettingsModal(false);

  return (
    <Modal show={showSettingsModal} onHide={handleClose} size="lg" centered>
      <Modal.Body className="rounded py-0 pe-0">
        <div className="d-flex w-100">
          <div style={{ maxWidth: 200 }} className="w-100">
            <nav className="pe-3">
              <ul className="list-unstyled">
                <div className="sidebar-link-group">
                  <div className="pb-4 pt-3">
                    <span className="small bold text-secondary ps-2">
                      SETTINGS
                    </span>
                  </div>

                  <li
                    className={`nav-item px-2 my-2 rounded pointer ${selectedTab === "general" ? "active" : ""}`}
                    onClick={() => setSelectedTab("general")}
                  >
                    <span className="nav-link">
                      <Settings size={18} color="var(--color-text-lighter)" />
                      <span className="ps-3 medium">General</span>
                    </span>
                  </li>

                  <li
                    className={`nav-item px-2 my-2 rounded pointer ${selectedTab === "theme" ? "active" : ""}`}
                    onClick={() => setSelectedTab("theme")}
                  >
                    <span className="nav-link">
                      <Palette size={18} color="var(--color-text-lighter)" />
                      <span className="ps-3 medium">Theme</span>
                    </span>
                  </li>

                  <li
                    className={`nav-item px-2 my-2 rounded pointer ${selectedTab === "view" ? "active" : ""}`}
                    onClick={() => setSelectedTab("view")}
                  >
                    <span className="nav-link">
                      <LayoutGrid size={18} color="var(--color-text-lighter)" />
                      <span className="ps-3 medium">View</span>
                    </span>
                  </li>

                  <li
                    className={`nav-item px-2 my-2 rounded pointer ${selectedTab === "danger" ? "active" : ""}`}
                    onClick={() => setSelectedTab("danger")}
                  >
                    <span className="nav-link text-danger">
                      <CircleAlert
                        size={18}
                      />
                      <span className="ps-3 medium">Danger Zone</span>
                    </span>
                  </li>
                </div>
              </ul>
            </nav>
          </div>

          <div
            className="w-100"
            style={{ maxHeight: "70vh", overflowY: "auto" }}
          >
            <div className="w-100 pt-3 pb-5 px-5">
              {selectedTab === "general" && <GeneralSettings />}
              {selectedTab === "theme" && <ThemeSettings />}
              {selectedTab === "view" && <ViewSettings />}
              {selectedTab === "danger" && <DangerZone />}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default SettingsModal;
