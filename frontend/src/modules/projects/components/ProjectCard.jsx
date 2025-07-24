import { Card, CardActionArea, Grid } from "@mui/material";
import { ReactComponent as FolderSVG } from "../../common/assets/img/vectors/folder.svg";

function ProjectCard({ project, handleSwitchProject }) {
  return (
    <Grid item xs={12} md={4}>
      <Card
        className="h-100"
        onClick={() => {
          handleSwitchProject(project.id);
        }}
      >
        <CardActionArea
          sx={{
            height: "100%",
            width: "100%",
            p: 3,
          }}
        >
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div className="row">
              <div className="col-md-3 d-flex align-items-center h-100">
                <div className="w-fit p-0 rounded-sm">
                  <FolderSVG />
                </div>
              </div>
              <div className="col-md-9 d-flex align-items-center h-100">
                <h5 className="fw-500 medium">{project.name}</h5>
              </div>
            </div>

            <span className="txt-lighter pb-3" id="projectDescription">
              {project.description}
            </span>

            <div className="d-flex align-items-center flex-wrap">
              {project?.users?.map((user) => {
                return (
                  <img
                    src={user?.user_details?.avatar}
                    key={user?.id}
                    className="rounded me-2"
                    alt=""
                    style={{
                      maxHeight: 22,
                      aspectRatio: 1,
                      objectFit: "cover",
                      height: "100%",
                    }}
                  />
                );
              })}
            </div>
          </div>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default ProjectCard;
