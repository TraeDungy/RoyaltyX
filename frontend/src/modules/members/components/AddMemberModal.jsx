import { useEffect, useState } from "react";
import { getUsers } from "../../admin_panel/api/user";
import { addProjectMember } from "../api/members";
import { toast } from "react-toastify";
import { Plus } from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";
import { useAuth } from "../../common/contexts/AuthContext";

function AddMemberModal({
  project,
  setProject,
  showAddMemberModal,
  setShowAddMemberModal,
}) {
  const [users, setUsers] = useState([]);
  const { currentlySelectedProjectId } = useAuth();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching :", error);
      }
    };

    fetchContacts();
  }, []);

  const handleCloseAddMemberModal = () => {
    setShowAddMemberModal(false);
  };

  const handleAddMember = async (user) => {
    const data = {
      user: user.id,
      project: currentlySelectedProjectId,
    };

    try {
      const createdProjectUser = await addProjectMember(data);

      setProject({
        ...project,
        users: [...project.users, createdProjectUser],
      });

      setShowAddMemberModal(false);
      toast.success("Successfully added a new project member!");
    } catch (error) {
      toast.error("Error while trying to add a member!");
    }
  };

  return (
    <>
      <Modal
        centered
        show={showAddMemberModal}
        size="lg"
        onHide={handleCloseAddMemberModal}
      >
        <Modal.Header className="border-0">
          <Modal.Title className="h5">Add project member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="medium">{user.name}</td>
                    <td className="medium">{user.email}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-primary medium"
                        onClick={() => {
                          handleAddMember(user);
                        }}
                      >
                        <Plus className="h4 mb-0 me-1" /> Add
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddMemberModal;
