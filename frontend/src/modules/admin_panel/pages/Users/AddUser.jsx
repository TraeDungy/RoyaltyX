import { useState } from "react";
import { register } from "../../../authentication/api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../../common/components/Button";

export default function AddUser() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const user = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await register(user);
      if (response.success) {
        toast.success("Successfully added a user!");
        navigate("/admin/users");
      }
    } catch (error) {
      setError("An error occurred while logging in.");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="main-auth-page-container">
      <div className="px-5 py-5 w-100" style={{ maxWidth: 620 }}>
        <div>
          <div className="py-3">
            <h3 className="bold">Add User</h3>
            <p>Enter user details and create their account</p>
          </div>
        </div>
        {error && <span className="text-danger small">{error}</span>} {}
        <form onSubmit={handleSubmit}>
          <div className="py-2">
            <label className="mb-1">
              Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              style={{ backgroundColor: "#EBE9F9" }}
              placeholder="Enter your name"
            />
          </div>
          <div className="py-2">
            <label className="mb-1">
              Email <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              style={{ backgroundColor: "#EBE9F9" }}
              placeholder="Enter your email"
            />
          </div>
          <div className="py-2">
            <label className="mb-1">
              Temporary Password <span className="text-danger">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              className="form-control"
              style={{ backgroundColor: "#EBE9F9" }}
              placeholder="••••••••"
            />
          </div>

          <div className="py-2 mt-3">
            <Button variant="primary" size="sm" type="submit" loading={loading}>
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
