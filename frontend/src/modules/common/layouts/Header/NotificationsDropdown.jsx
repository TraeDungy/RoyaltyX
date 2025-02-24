import { useState } from "react";
import { Bell, Envelope, EnvelopeOpen, Trash } from "react-bootstrap-icons";
import icon from "../../assets/img/brand/icon.webp";
import styles from "./NotificationsDropdown.module.css";

const NotificationsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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
          7
        </span>
      </div>

      {isOpen && (
        <div
          className="dropdown-menu rounded-lg shadow show position-absolute"
          style={{
            top: "100%",
            right: 0,
            width: "300px",
            zIndex: 1050,
          }}
        >
          <h6 className="px-3 py-2">Notifications (12)</h6>
          <div className="list-group">
            <button className="list-group-item list-group-item-action">
              <div className="d-flex justify-content-between align-items-center">
                <div className={styles.notificationIconWrapper}>
                  <img className={styles.notificationIcon} src={icon} alt="" />
                </div>
                <h6 className="mb-0">New message received</h6>
                <div>
                  <Envelope className="me-1 pointer txt-lighter" />{" "}
                  <Trash className="me-1 pointer txt-lighter" />{" "}
                  <EnvelopeOpen className="me-1 pointer txt-lighter" />
                </div>
              </div>
              <span className="small txt-lighter">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Fugiat, numquam quam.
              </span>
            </button>
            <button className="list-group-item list-group-item-action">
              <div className="d-flex justify-content-between align-items-center">
                <div className={styles.notificationIconWrapper}>
                  <img className={styles.notificationIcon} src={icon} alt="" />
                </div>
                <h6 className="mb-0">New message received</h6>
                <div>
                  <Envelope className="me-1 pointer txt-lighter" />{" "}
                  <Trash className="me-1 pointer txt-lighter" />{" "}
                  <EnvelopeOpen className="me-1 pointer txt-lighter" />
                </div>
              </div>
              <span className="small txt-lighter">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Fugiat, numquam quam.
              </span>
            </button>
            <button className="list-group-item list-group-item-action">
              <div className="d-flex justify-content-between align-items-center">
                <div className={styles.notificationIconWrapper}>
                  <img className={styles.notificationIcon} src={icon} alt="" />
                </div>
                <h6 className="mb-0">New message received</h6>
                <div>
                  <Envelope className="me-1 pointer txt-lighter" />{" "}
                  <Trash className="me-1 pointer txt-lighter" />{" "}
                  <EnvelopeOpen className="me-1 pointer txt-lighter" />
                </div>
              </div>
              <span className="small txt-lighter">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Fugiat, numquam quam.
              </span>
            </button>
            <button className="list-group-item list-group-item-action">
              <div className="d-flex justify-content-between align-items-center">
                <div className={styles.notificationIconWrapper}>
                  <img className={styles.notificationIcon} src={icon} alt="" />
                </div>
                <h6 className="mb-0">New message received</h6>
                <div>
                  <Envelope className="me-1 pointer txt-lighter" />{" "}
                  <Trash className="me-1 pointer txt-lighter" />{" "}
                  <EnvelopeOpen className="me-1 pointer txt-lighter" />
                </div>
              </div>
              <span className="small txt-lighter">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Fugiat, numquam quam.
              </span>
            </button>
          </div>
          <div className="d-flex justify-content-between pb-2 pt-1">
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
