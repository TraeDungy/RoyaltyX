import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../common/contexts/AuthContext";
import Button from "../../../common/components/Button";
import styles from "./Register.module.css";
import { register } from "../../api/auth";
import icon from "../../../common/assets/img/brand/icon.webp";

export default function Register() {
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData(e.target);
    const user = Object.fromEntries(data.entries());

    const response = await register(user);
    if (response.success) {
      toast.success("Successfully created an account!");
      navigate("/login");
    } else {
      setError(response.message);
    }

    setLoading(false);
  };

  return (
    <div className={styles.registerPageWrapper}>
      <div style={{ maxWidth: 470 }} className="w-100">
        <img src={icon} style={{ maxWidth: 60 }} className="mb-4" alt="" />
        <h2 className="bold">Sign up</h2>
        <p className="mb-4 txt-lighter">Welcome! Please enter your details.</p>
        {error && <span className="text-danger small">{error}</span>} {}
        <form onSubmit={handleSubmit}>
          <div className="py-2">
            <label className="mb-1">Name</label>
            <input
              type="text"
              name="name"
              className="form-control py-3"
              placeholder="Enter your name"
            />
          </div>
          <div className="py-2">
            <label className="mb-1">Email</label>
            <input
              type="text"
              name="email"
              className="form-control py-3"
              placeholder="Enter your email"
            />
          </div>
          <div className="py-2">
            <label className="mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="form-control py-3"
              placeholder="••••••••"
            />
          </div>

          <div className="py-2 mt-3">
            <Button variant="primary" size="lg" type="submit" loading={loading}>
              Sign Up
            </Button>
          </div>

          <div className="d-flex justify-content-center py-4">
            <span className="px-1 txt-lighter">Already have an account?</span>
            <Link to="/login" className="px-1 fw-500 text-decoration-none">
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
