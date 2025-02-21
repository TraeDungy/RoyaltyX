import { useState, useEffect } from "react";
import { getProjectMembers } from "../../projects/api/project";
import AddMemberModal from "../components/AddMemberModal";
import { removeProjectMember } from "../api/members";
import { toast } from "react-toastify";
import { TrashFill } from "react-bootstrap-icons";

function Members() {
  const [projectMembers, setProjectMembers] = useState([]);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProjectMembers = await getProjectMembers();
        setProjectMembers(fetchedProjectMembers);
      } catch (error) {
        console.error("Error fetching :", error);
      }
    };

    fetchData();
  }, []);

  const handleRemoveProjectMember = async (user) => {
    try {
      await removeProjectMember(user.id);
      toast.success("Successfully removed a project member!");
      setProjectMembers((prevProjectMembers) =>
        prevProjectMembers.filter((member) => member?.user?.id !== user.id),
      );
    } catch (error) {
      toast.error("Error while trying to remove a member!");
    }
  };

  const handleOpenMembersModal = () => {
    setShowAddMemberModal(true);
  };

  return (
    <>
      <div className="px-4">
        <div className="d-flex justify-content-between align-items-center mt-4 w-100">
          <h5 className="bold mb-0">Project Members</h5>
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
              {projectMembers.map((projectMember) => (
                <tr key={projectMember.id}>
                  <td className="medium">
                    {projectMember?.user_details?.name}
                  </td>
                  <td className="medium">
                    {projectMember?.user_details?.email}
                  </td>
                  <td className="medium">{projectMember?.role}</td>
                  <td className="text-center">
                    <TrashFill
                      className="text-danger pointer"
                      onClick={() => {
                        handleRemoveProjectMember(projectMember?.user_details);
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
        showAddMemberModal={showAddMemberModal}
        setShowAddMemberModal={setShowAddMemberModal}
        projectMembers={projectMembers}
        setProjectMembers={setProjectMembers}
      />
    </>
  );
}

export default Members;
