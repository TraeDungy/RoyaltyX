import { useEffect, useState } from "react";
import { deleteProject, updateProjectInfo } from "../../projects/api/project";
import { toast } from "react-toastify";
import PageHeader from "../../common/components/PageHeader";
import { useProject } from "../../common/contexts/ProjectContext";
import { Alert, Button, TextField } from "@mui/material";

const Settings = () => {
  const { project, setProject } = useProject();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (project) {
      setName(project.name || "");
      setDescription(project.description || "");
    }
  }, [project]);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const data = {
      name: name,
      description: description,
    };

    try {
      await updateProjectInfo(data);
      toast.success("Successfully updated!");

      setProject({
        ...project,
        name: name,
        description: description,
      });
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="py-3">
      <PageHeader
        title="Project Settings"
        description="This is a page where you will be able to edit all of the settings or preferences inside of this project."
      />

      {error && <span className="text-danger small">{error}</span>}

      <TextField
        fullWidth
        variant="outlined"
        label="Name"
        value={name}
        autoComplete="new-password"
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        fullWidth
        variant="outlined"
        label="Description"
        value={description}
        sx={{ mt: 3 }}
        autoComplete="new-password"
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={4}
      />

      <div className="pt-4">
        <Button
          color="primary"
          variant="contained"
          size="sm"
          onClick={handleSubmit}
          loading={loading}
        >
          Save changes
        </Button>
      </div>

      <h4 className="bold mt-5">Danger zone</h4>

      <div className="mt-3 mb-5">
        <div className="mt-2 mb-3">
          <Alert severity="error">
            Deleting this project is a permanent action and cannot be undone.
            You will lose all data associated with this project.
          </Alert>
        </div>
        <Button
          color="error"
          size="sm"
          variant="contained"
          onClick={async () => {
            if (
              window.confirm(
                "Are you sure you want to delete this project? This action cannot be undone."
              )
            ) {
              try {
                setLoading(true);
                await deleteProject();
                window.location.href = "/my-projects";
              } catch (error) {
                toast.error(error.message);
              } finally {
                setLoading(false);
              }
            }
          }}
          loading={loading}
        >
          Delete Project
        </Button>
      </div>
    </div>
  );
};

export default Settings;
