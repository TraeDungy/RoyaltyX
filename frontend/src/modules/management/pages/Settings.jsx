import { useState, useEffect } from "react";
import Button from "../../common/components/Button";
import { updateProjectInfo, getProjectInfo } from "../../projects/api/project";
import { toast } from "react-toastify";

const Settings = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [project, setProject] = useState([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await getProjectInfo();
        setProject(response);
        setName(response.name);
        setDescription(response.description);
      } catch (error) {
        console.error("Error fetching project info:", error);
      }
    };

    fetchProject();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const data = {
      name: name,
      description: description,
    };

    try {
      const response = await updateProjectInfo(data);
      setProject(response);
      toast.success("Successfully updated!");
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="container px-5 py-3">
      <h4 className="bold mb-3">Project Settings</h4>
      <p>
        This is a page where you will be able to all of the settings or
        preferences inside of this project.
      </p>

      {error && <span className="text-danger small">{error}</span>}

      <label className="pb-2 mt-4">Name</label>
      <input
        type="text"
        className="form-control medium bg-gray-light py-3"
        placeholder="Project name"
        value={name}
        autoComplete="new-password"
        onChange={(e) => setName(e.target.value)}
      />

      <label className="mt-4 mb-2">Description</label>
      <textarea
        type="text"
        className="form-control bg-gray-light py-2 medium"
        placeholder="Project description"
        value={description}
        autoComplete="new-password"
        onChange={(e) => setDescription(e.target.value)}
        style={{ height: 130 }}
      />

      <div className="pt-4">
        <Button
          variant="primary"
          size="sm"
          onClick={handleSubmit}
          loading={loading}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
};

export default Settings;
