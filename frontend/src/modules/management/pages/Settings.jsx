import { useState } from "react";
import Button from "../../common/components/Button";
import { updateProjectInfo } from "../../projects/api/project";
import { toast } from "react-toastify";
import PageHeader from "../../common/components/PageHeader";

const Settings = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="py-3">
      <PageHeader
        title="Project Settings"
        description="This is a page where you will be able to all of the settings or
        preferences inside of this project."
      />

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
