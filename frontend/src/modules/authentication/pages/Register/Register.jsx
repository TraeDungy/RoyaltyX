import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../../common/components/Button";
import TextField from "@mui/material/TextField";
import styles from "./Register.module.css";
import { register } from "../../api/auth";
import icon from "../../../common/assets/img/brand/icon-2.webp";

export default function Register() {
  const [error, setError] = useState("");
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
        <img src={icon} style={{ maxWidth: 60 }} className="mb-5" alt="" />
        <h2 className="bold">Sign up</h2>
        <p className="mb-3 txt-lighter">Welcome! Please enter your details.</p>
        {error && <span className="text-danger small">{error}</span>}
        <form onSubmit={handleSubmit}>
          <div className="py-2">
            <TextField
              label="Name"
              name="name"
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Enter your name"
            />
          </div>
          <div className="py-2">
            <TextField
              label="Email"
              name="email"
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Enter your email"
            />
          </div>
          <div className="py-2">
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              variant="outlined"
              margin="normal"
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
