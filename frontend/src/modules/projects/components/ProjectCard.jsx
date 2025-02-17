import profileImagePlaceholder from "../../common/assets/img/icons/profile.svg";
import { ReactComponent as FolderSVG } from "../../common/assets/img/vectors/folder.svg";

function ProjectCard({ project, handleSwitchProject }) {
  return (
    <div className="col-12 col-md-6 col-lg-3 col-sm-6 col-xs-6 px-3 mb-5">
      <div
        className="rounded-sm h-100 px-4 pt-4 pb-2 card 
                hover pointer w-100 d-flex shadow-sm"
        onClick={() => {
          handleSwitchProject(project.id);
        }}
      >
        <div className="row">
          <div className="col-md-3 d-flex align-items-center h-100">
            <div className="w-fit p-0 rounded-sm">
              <FolderSVG />
            </div>
          </div>
          <div className="col-md-9">
            <h5 className="fw-500 medium mb-0">{project.name}</h5>

            {project?.users?.map((user) => {
              return (
                <img
                  src={user?.avatar ?? profileImagePlaceholder}
                  key={user?.id}
                  className="rounded-circle mx-1"
                  alt=""
                  style={{
                    maxHeight: 26,
                    aspectRatio: 1,
                    objectFit: "cover",
                    height: "100%",
                  }}
                />
              );
            })}
          </div>
        </div>

        <span className="txt-lighter small mt-3" id="projectDescription">
          {project.description}
        </span>

        <div className="row d-flex align-items-end pt-3 h-100">
          <div className="col-6">
            <span className="bold">{project?.users?.length}</span>
            <p className="small txt-lighter">Members</p>
          </div>
          <div className="col-6">
            <span className="badge badge-primary w-fit p-2 mb-3 bg-warning small">
              {project.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
