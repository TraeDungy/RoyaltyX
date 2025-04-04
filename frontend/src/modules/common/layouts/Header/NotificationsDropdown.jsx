import { useState, useEffect } from "react";
import { Bell, EnvelopeOpen } from "react-bootstrap-icons";
import icon from "../../assets/img/brand/icon.webp";
import styles from "./NotificationsDropdown.module.css";
import { getNotifications } from "../../api/notifications";

const NotificationsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getNotifications();
        setNotifications(response);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="ps-4 position-relative">
      <div
        className="position-relative"
        onClick={toggleDropdown}
        style={{ cursor: "pointer" }}
      >
        <Bell style={{ fontSize: 19 }} className="txt-lighter" />
        <span
          className="badge badge-primary bg-danger position-absolute"
          style={{
            right: 0,
            bottom: 0,
            transform: "translate(50%, 50%)",
            fontSize: 9,
          }}
        >
          {notifications.length}
        </span>
      </div>

      {isOpen && (
        <div
          className="dropdown-menu rounded shadow show position-absolute"
          style={{
            top: "100%",
            right: 0,
            width: "350px",
            zIndex: 1050,
          }}
        >
          <h6 className="px-3 py-2">Notifications ({notifications.length})</h6>
          <div className="list-group" style={{ minHeight: 270 }}>
            {notifications.map(notification => (
              <div className="list-group-item list-group-item-action">
                <div className="d-flex justify-content-between align-items-center">
                  <div className={styles.notificationIconWrapper}>
                    <img className={styles.notificationIcon} src={icon} alt="" />
                  </div>
                  <span className="mb-0 ps-3">{notification.title}</span>
                </div>
              </div>
            ))}

          </div>
          <div className="d-flex border-top justify-content-between pt-3 pb-2">
            <span className="px-3 pointer medium txt-primary d-flex align-items-center">
              <EnvelopeOpen className="me-1" /> Inbox
            </span>
            <span className="px-3 pointer medium txt-primary">
              Mark all as read
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
