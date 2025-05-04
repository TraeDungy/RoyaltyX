import { useState } from "react";
import AddMemberModal from "../components/AddMemberModal";
import { removeProjectMember } from "../api/members";
import { toast } from "react-toastify";
import { TrashFill } from "react-bootstrap-icons";
import { useProject } from "../../common/contexts/ProjectContext";

function Members() {
  const { project, setProject } = useProject();

  const [showAddMemberModal, setShowAddMemberModal] = useState(false);

  const handleRemoveProjectMember = async (user) => {
    try {
      await removeProjectMember(user.id);
      toast.success("Successfully removed a project member!");
      setProject({
        ...project,
        users: project.users.filter((u) => u.id !== user.id),
      });
    } catch (error) {
      toast.error("Error while trying to remove a member!");
    }
  };

  const handleOpenMembersModal = () => {
    setShowAddMemberModal(true);
  };

  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center mt-4 w-100">
          <h4 className="bold mb-0">Project Members</h4>
          <button
            className="btn btn-primary rounded medium"
            onClick={() => handleOpenMembersModal()}
          >
            Add user
          </button>
        </div>

        <div className="table-responsive pt-4">
          <table className="table table-hover table-bordered">
            <tbody>
              {project?.users?.map((user) => (
                <tr key={user.id}>
                  <td className="medium">{user?.user_details?.name}</td>
                  <td className="medium">{user?.user_details?.email}</td>
                  <td className="medium">{user?.role}</td>
                  <td className="text-center">
                    <TrashFill
                      className="text-danger pointer"
                      onClick={() => {
                        handleRemoveProjectMember(user);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddMemberModal
        project={project}
        setProject={setProject}
        showAddMemberModal={showAddMemberModal}
        setShowAddMemberModal={setShowAddMemberModal}
      />
    </>
  );
}

export default Members;
