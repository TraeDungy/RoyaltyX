import { useTheme } from "../../common/contexts/ThemeContext";
import { getUsers } from "../../admin_panel/api/user";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import UserCard from "./UserCard";
import { createConversation } from "../api/conversation";
import { useNavigate } from "react-router-dom";

const CreateNewConversation = () => {
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response);
      } catch (error) {
        toast.error(error.message || "Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setSelectedParticipants([]);
    setShow(false);
  };

  const toggleUserSelection = (userId) => {
    setSelectedParticipants((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  const handleCreateConversation = async () => {
    const conversation = await createConversation(selectedParticipants);
    handleClose();
    navigate(`/inbox/${conversation.id}`);
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Create Conversation
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="lg"
        data-bs-theme={darkMode ? "dark" : undefined}
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Participants</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                isSelected={selectedParticipants.includes(user.id)}
                toggleUserSelection={toggleUserSelection}
              />
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleCreateConversation}
            disabled={selectedParticipants.length === 0}
          >
            Start Conversation
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateNewConversation;
