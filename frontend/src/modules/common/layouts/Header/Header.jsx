import { useState } from "react";
import styles from "./Header.module.css";
import UserDropdown from "./UserDropdown";
import { MessageSquare, Settings } from "lucide-react";
import SettingsModal from "../../components/Settings/SettingsModal";
import NotificationsDropdown from "./NotificationsDropdown";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";

function Header() {
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  return (
    <>
      <nav className={`${styles.navbar}`}>
        <div className="ps-2 d-flex align-items-center">
          <Breadcrumbs />
        </div>
        <div className="ms-auto d-flex align-items-center pe-2">
          <div className="ps-4">
            <Settings
              onClick={() => {
                setShowSettingsModal(true);
              }}
              strokeWidth={1.5} size={20}
              className="pointer txt-lighter"
            />
          </div>
          <Link to="/inbox" className="ps-4 position-relative">
          
            <MessageSquare strokeWidth={1.5} size={20} className="pointer txt-lighter" />
            <span
              className="badge badge-primary bg-danger position-absolute"
              style={{
                right: 0,
                bottom: 0,
                transform: "translate(50%, 50%)",
                fontSize: 9,
              }}
            >
              0
            </span>
          </Link>
          <NotificationsDropdown />
          <div className="ps-4 position-relative">
            <UserDropdown />
          </div>
        </div>
      </nav>
      <SettingsModal
        showSettingsModal={showSettingsModal}
        setShowSettingsModal={setShowSettingsModal}
      />
    </>
  );
}

export default Header;
