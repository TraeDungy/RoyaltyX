import { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import { getMyProjects } from "../api/project";
import { switchProject } from "../api/project";
import CreateNewProjectCard from "../components/CreateNewProjectCard";
import { useNavigate } from "react-router-dom";
import { Plus } from "react-bootstrap-icons";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";

function MyProjects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await getMyProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching :", error);
      }
    };

    fetchProjects();
  }, []);

  const handleSwitchProject = async (project_id) => {
    try {
      await switchProject(project_id);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Error fetching :", error);
    }
  };

  return (
    <div className="container pt-3">
      <div className="d-flex justify-content-between align-items-center mt-5 px-2 mb-4">
        <div>
          <h4 className="bold">Projects</h4>
          <p className="txt-lighter">
            Find all your personal and shared projects
          </p>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate("/projects/create");
          }}
        >
          <Plus className="me-1 h4 mb-0" /> Create
        </Button>
      </div>

      <Grid container spacing={4} sx={{ display: "flex", pb: 5 }} >
        <CreateNewProjectCard />
        {projects.map((project) => (
          <ProjectCard
            project={project}
            key={project.id}
            handleSwitchProject={handleSwitchProject}
          />
        ))}
      </Grid>
    </div>
  );
}

export default MyProjects;
