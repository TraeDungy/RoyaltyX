import { useState } from "react";
import { Gear, Palette, ExclamationCircle } from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";
import GeneralSettings from "./GeneralSettings";
import ThemeSettings from "./ThemeSettings";
import DangerZone from "./DangerZone";

function SettingsModal({ showSettingsModal, setShowSettingsModal }) {
  const [selectedTab, setSelectedTab] = useState("general");

  const handleClose = () => setShowSettingsModal(false);

  return (
    <Modal show={showSettingsModal} onHide={handleClose} size="lg" centered>
      <Modal.Body className="rounded py-0">
        <div className="d-flex">
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
                    <a className="nav-link">
                      <Gear />
                      <span className="ps-2 medium">General</span>
                    </a>
                  </li>

                  <li
                    className={`nav-item px-2 my-2 rounded pointer ${selectedTab === "theme" ? "active" : ""}`}
                    onClick={() => setSelectedTab("theme")}
                  >
                    <a className="nav-link">
                      <Palette />
                      <span className="ps-2 medium">Theme</span>
                    </a>
                  </li>

                  <li
                    className={`nav-item px-2 my-2 rounded pointer ${selectedTab === "danger" ? "active" : ""}`}
                    onClick={() => setSelectedTab("danger")}
                  >
                    <a className="nav-link text-danger">
                      <ExclamationCircle />
                      <span className="ps-2 medium">Danger Zone</span>
                    </a>
                  </li>
                </div>
              </ul>
            </nav>
          </div>

          <div className="w-100 pt-3 pb-5 px-5">
            {selectedTab === "general" && <GeneralSettings />}
            {selectedTab === "theme" && <ThemeSettings />}
            {selectedTab === "danger" && <DangerZone />}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default SettingsModal;
